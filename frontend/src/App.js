import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SkinLesionClassifier from "./pages/Home";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<SkinLesionClassifier />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;