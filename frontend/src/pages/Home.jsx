import React, { useState, useCallback } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useDropzone } from "react-dropzone";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { CardContent } from "../components/ui/cardContent";
import { Upload, Loader2 } from "lucide-react";

export default function SkinLesionClassifier() {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setImage(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' });

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

  return (
    <>
      <Helmet>
        <title>SkinLens</title>
      </Helmet>
      <header className="w-full text-center py-4 bg-blue-500 text-white">
        <h1 className="text-4xl font-bold">SkinLens</h1>
      </header>
      <div className="main-content">
        <Card className="w-full max-w-md p-4 bg-white shadow-lg rounded-2xl">
          <CardContent className="card-content">
            <div className="w-full p-4 border-2 border-gray-300 rounded-lg bg-gray-200">
              <div
                {...getRootProps()}
                className={`cursor-pointer p-8 border-2 border-dashed border-gray-300 rounded-lg text-black hover:bg-gray-300 ${isDragActive ? 'bg-gray-400' : ''}`}
                style={{ width: '100%', height: '200px' }}
              >
                <input {...getInputProps()} />
                {image ? image.name : <Upload size={48} />}
                {isDragActive ? <p>Drop your image here ...</p> : <p>Drag and drop your image here, or click to select files</p>}
              </div>
            </div>
          </CardContent>
          <div className="mt-8">
            <Button onClick={handleUpload} disabled={!image || loading} className="large-button">
              {loading ? <Loader2 className="animate-spin" size={8} /> : "Upload & Classify"}
            </Button>
            {prediction && (
              <div className="result-box">
                <h3 className="text-lg font-bold">Prediction:</h3>
                <p className="text-gray-500">Class: {prediction.class}</p>
                <p className="text-gray-500">Confidence: {Math.round(prediction.confidence * 100)}%</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </>
  );
}