import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';

const root = document.getElementById('root');

if (root) {
    ReactDOM.createRoot(root).render(<App />);
  } else {
    console.error("Root element not found!");
  }

document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('prediction-canvas');
  const ctx = canvas.getContext('2d');
  const downloadButton = document.getElementById('download-button');

  // Function to draw the image and prediction results on the canvas
  function drawImageAndPrediction(imageSrc, predictionText) {
    const image = new Image();
    image.onload = function() {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      ctx.font = '20px Arial';
      ctx.fillStyle = 'black';
      ctx.fillText(predictionText, 10, canvas.height - 30);
    };
    image.src = imageSrc;
  }

  // Example usage: Replace with your actual image source and prediction text
  const imageSrc = 'path/to/your/image.jpg'; // Replace with your image source
  const predictionText = 'Prediction: Skin Lesion'; // Replace with your prediction text
  drawImageAndPrediction(imageSrc, predictionText);

  // Event listener for the download button
  downloadButton.addEventListener('click', function() {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'prediction-result.png';
    link.click();
  });
});