import torch
import torchvision.transforms as transforms
from PIL import Image
from io import BytesIO

class CNNModel:
    def __init__(self):
        self.model = torch.hub.load('pytorch/vision:v0.10.0', 'resnet18', pretrained=True)
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

        return predicted.item(), confidence

def preprocess_image(image_file):
    image = Image.open(BytesIO(image_file))
    return image