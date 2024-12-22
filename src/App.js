import React from "react";
import "./App.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Group from "./Group";

function Home() {
  const clientId = "669156778184-87eho0k8pa4q3gcdeicrcr77069q2dlo.apps.googleusercontent.com"; // Replace with your Google client ID
  const navigate = useNavigate();

  const responseMessage = (response) => {
    console.log("Google Login Success:", response);
    fetch("/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: response.credential }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log("Login successful:", data);
          window.location.href = "/dashboard";
        } else {
          console.error("Login failed:", data.message);
        }
      })
      .catch((error) => console.error("Error during login:", error));
  };

  const handleError = () => {
    console.error("Google Login Failed");
  };

  const handleProceed = () => {
    navigate("/group"); // Redirect to the Group.js screen
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
        <header className="App-header">
          <div className="top-left">GD+</div>
          <div className="top-right">
            <GoogleLogin onSuccess={responseMessage} onError={handleError} />
          </div>
          <div className="title-container">
            <h1 className="app-title">GDPlus+</h1>
          </div>
        </header>

        <div className="topics-section">
          <div className="topics-title">Select a Group Discussion Topic</div>
          <div className="topics-container">
            <div className="topic-card">AI and Machine Learning</div>
            <div className="topic-card">5G Technology</div>
            <div className="topic-card">Quantum Computing</div>
            <div className="topic-card">Cloud Computing</div>
            <div className="topic-card">Cybersecurity</div>
            <div className="topic-card">Blockchain</div>
          </div>
          <div className="group-size-section">
            <div className="group-size-title">Choose Number of People in the Group</div>
            <div className="group-size-container">
              <div className="group-size-card">1 Person</div>
              <div className="group-size-card">2 Persons</div>
              <div className="group-size-card">3 Persons</div>
            </div>
          </div>
          <div className="proceed-section">
            <button className="proceed-button" onClick={handleProceed}>
              Proceed
            </button>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/group" element={<Group />} />
      </Routes>
    </Router>
  );
}

export default App;
