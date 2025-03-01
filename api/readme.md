# SkinLens API

This is the backend API for the SkinLens project, which serves a Convolutional Neural Network (CNN) for image classification.

## Setup Instructions
### 1. Create a Virtual Environment

First, create a virtual environment to isolate the project's dependencies. You can use `venv` for this purpose.

#### On Unix-based systems:
```sh
python3 -m venv venv
source venv/bin/activate
```

#### On Windows: 
```sh
python -m venv venv
venv\Scripts\activate
```

### 2. Install Dependencies
With the virtual environment activated, install the required dependencies using the requirements.txt file.
```sh
pip install -r requirements.txt
```

### 3. Run the FastAPI Application
Use uvicorn to run the FastAPI application.
```sh
uvicorn api.main:app --reload
```
The server will start, and you can access the API at http://127.0.0.1:8000/api/classify.