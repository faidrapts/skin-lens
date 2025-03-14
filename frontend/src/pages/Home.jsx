import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useDropzone } from "react-dropzone";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { CardContent } from "../components/ui/cardContent";
import { Upload, Loader2, Search } from "lucide-react";

export default function SkinLesionClassifier() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  const handleUpload = async () => {
    if (!image) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post("http://localhost:8000/api/classify", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("API Response:", response.data); // Add this line to debug
      setPrediction(response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    setLoading(false);
  };

  const handleClear = () => {
    setImage(null);
    setImagePreview(null);
    setPrediction(null);
  };

  useEffect(() => {
    if (prediction && imagePreview) {
      const canvas = document.getElementById('prediction-canvas');
      if (canvas) {
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.onload = function() {
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
          ctx.font = '20px Arial';
          ctx.fillStyle = 'black';
          ctx.fillText(`Class: ${prediction.class} (${prediction.binary_class})`, 10, canvas.height - 50);
          ctx.fillText(`Confidence: ${Math.round(prediction.confidence * 100)}%`, 10, canvas.height - 20);
        };
        image.src = imagePreview;
      }
    }
  }, [prediction, imagePreview]);

  useEffect(() => {
    const downloadButton = document.getElementById('download-button');
    if (downloadButton) {
      downloadButton.addEventListener('click', function() {
        const canvas = document.getElementById('prediction-canvas');
        if (canvas) {
          const link = document.createElement('a');
          link.href = canvas.toDataURL('image/png');
          link.download = 'prediction-result.png';
          link.click();
        }
      });
    }
  }, [prediction]);

  return (
    <>
      <Helmet>
        <title>SkinLens</title>
      </Helmet>
      <header className="w-full text-center py-4 bg-blue-500 text-white">
        <h1 className="text-4xl font-bold">SkinLens <Search size={40} /></h1>
        <h3 className="caption typing-animation">Your skin lesion diagnosis assistant.</h3>
      </header>
      <hr className="separator" />
      <div className="main-content">
        <div className="flex-container">
          <Card className="w-full max-w-md p-4 bg-white shadow-lg rounded-2xl">
            <CardContent className="card-content">
              <div className="upload-area" {...getRootProps()}>
                <input {...getInputProps()} />
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Preview" className="thumbnail" />
                    <Button onClick={handleClear} className="clear-button mt-4">Clear</Button>
                  </>
                ) : (
                  <>
                    <Upload size={48} />
                    <p>Drag and drop your image here, or click to select files</p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
          <div className="text-box">
            <div>
              <h3 className="text-lg font-bold">Instructions</h3>
              <p>Please upload an image (.jpg or .png) of the skin lesion. 
                The AI model will analyze the image and provide a prediction of the lesion type along with a confidence score.</p>
              <p>The lesion types covered by the model are: Melanoma, Melanocytic nevus, Basal cell carcinoma, Actinic keratosis,
                Benign keratosis (solar lentigo / seborrheic keratosis / lichen planus-like keratosis), Dermatofibroma, Vascular lesion, Squamous cell carcinoma.</p>
            </div>
            <Button onClick={handleUpload} disabled={!image || loading} className="large-button w-full mt-8">
              {loading ? <Loader2 className="animate-spin" size={18} /> : "Classify"}
            </Button>
          </div>
        </div>
        {prediction && (
          <div className="flex-container">
            <button id="download-button" className="download-button mt-4">Download Image</button>
            <div className="result-box mt-8">
              <h3 className="text-lg font-bold">Prediction:</h3>
              <p className="text-gray-700">Class: {prediction.class} ({prediction.binary_class}), Confidence: {Math.round(prediction.confidence * 100)}%</p>
            </div>
          </div>
        )}
        <canvas id="prediction-canvas" width="800" height="600" style={{ display: 'none' }}></canvas>
      </div>
      <footer className="w-full text-center py-4 bg-blue-500 text-white">
        <p>&copy; {new Date().getFullYear()} Faidra Anastasia Patsatzi, Aicha Zayane, Mustapha Daly Hassen. All rights reserved.</p>
      </footer>
    </>
  );
}