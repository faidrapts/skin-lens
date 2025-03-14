import torch
import torch.nn as nn
import torchvision.transforms as transforms
import torchvision.models as models
from PIL import Image
from io import BytesIO


class EfficientNetLesion(nn.Module):
    def __init__(self, out_dim, pretrained=False):
        super(EfficientNetLesion, self).__init__()

        self.enet = models.efficientnet_b1(pretrained=pretrained)
        self.enet.classifier = nn.Identity()

        # Dropout layers
        self.dropouts = nn.ModuleList([
            nn.Dropout(0.7) for _ in range(5)
        ])

        #in_ch = 1536  # EfficientNet-B3 has 1536 output features
        in_ch = 1280  # EfficientNet-B1 has 1280 output features
        self.myfc = nn.Linear(in_ch, out_dim)

    def forward(self, x):
        x = self.enet(x).squeeze(-1).squeeze(-1)

        # Apply dropout and average the outputs
        for i, dropout in enumerate(self.dropouts):
            if i == 0:
                out = self.myfc(dropout(x))
            else:
                out += self.myfc(dropout(x))
        out /= len(self.dropouts)

        return out


class CNNModel:
    def __init__(self):
        self.model = EfficientNetLesion(out_dim=8, pretrained=True)
        self.checkpoint = torch.load('api/models/checkpoint_epoch__effnet_b1_35.pth', map_location=torch.device('cpu'))
        self.model.load_state_dict(self.checkpoint['model_state_dict'])
        self.model.eval()  # Set the model to evaluation mode

        # Define the image transformations
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ])

    def predict(self, image):
        # Apply the transformations to the image
        image = self.transform(image).unsqueeze(0)  # Add batch dimension

        # Perform the prediction
        with torch.no_grad():
            outputs = self.model(image)
            _, predicted = torch.max(outputs, 1)
            confidence = torch.nn.functional.softmax(outputs, dim=1)[0][predicted].item()
            
        labels = ['Melanoma', 'Melanocytic nevus', 'Basal cell carcinoma', 'Actinic keratosis', 'Benign keratosis', 'Dermatofibroma', 'Vascular lesion', 'Squamous cell carcinoma']
        predicted_label = labels[predicted.item()]
        if predicted_label in ['Melanoma', 'Basal cell carcinoma', 'Actinic keratosis', 'Squamous cell carcinoma']:
            binary_label = 'Cancer'
        else:
            binary_label = 'Non-cancer'
        
        return binary_label, predicted_label, confidence

def preprocess_image(image_file):
    image = Image.open(BytesIO(image_file))
    return image