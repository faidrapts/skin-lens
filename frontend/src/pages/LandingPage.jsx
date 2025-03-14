import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  const handleGetStarted = () => {
    setFadeOut(true);
    setTimeout(() => {
      navigate("/home");
    }, 1000); // Match the duration of the CSS transition
  };

  return (
    <div className={`landing-page ${fadeOut ? "fade-out" : ""}`}>
      <h1 className="landing-title">SkinLens</h1>
      <div className="loading-circle">
        <Loader2 className="animate-spin" size={48} />
      </div>
      <button className="get-started-button" onClick={handleGetStarted}>
        Get started now.
      </button>
    </div>
  );
}