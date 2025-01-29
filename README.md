# SkinLens: Interactive Lesion Diagnosis using CNNs

SkinLens is a web application designed to assist in the diagnosis of skin lesions. Users can upload high-quality images of skin lesions, which are then classified using deep learning algorithms. This tool aims to provide an interactive and accurate diagnosis to help in early detection and treatment.

## Target Project Structure
```php
skin-lesion-classifier/
│── backend/                # Backend server for model inference
│   ├── model/              # model (trained weights, preprocessing)
│   ├── api/                # API routes for handling requests
│   ├── app.py              # Flask/FastAPI entry point
│   ├── requirements.txt    # Backend dependencies
│── frontend/               # Frontend application
│   ├── public/             # Static assets
│   ├── src/                # React components
│   ├── App.js              # Main frontend app
│   ├── index.js            # Entry point
│   ├── package.json        # Frontend dependencies
│── notebooks/              # Jupyter Notebooks for model training
│── deployment/             # Deployment configs (Docker, cloud setup)
│── README.md               # Project documentation
```

## How to run locally
### Web application
1. Navigate to /frontend via 
```bash
cd frontend
```
2. Install project dependencies:
```bash
npm install
```
3. Run the webpack server in dev mode:
```bash
npm run dev
```
### API (TODO)