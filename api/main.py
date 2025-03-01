from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes.classify_routes import router as classify_router

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow requests from frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(classify_router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Welcome to the SkinLens API"}