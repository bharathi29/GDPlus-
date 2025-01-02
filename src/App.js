import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Group from "./Group";
import Signup from "./Signup";
import Login from "./Login";

function Home({ userEmail }) {
  const navigate = useNavigate();

  const handleProceed = () => {
    navigate("/group"); // Redirect to the Group.js screen
  };

  const handleSignUp = () => {
    navigate("/signup"); // Redirect to the Sign-Up page
  };

  const handleLogin = () => {
    navigate("/login"); // Redirect to the Log-In page
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="top-left">GD+</div>
        <div className="auth-buttons">
          {userEmail ? (
            <span className="user-email">Hey {userEmail}</span>
          ) : (
            <>
              <button className="auth-button" onClick={handleSignUp}>
                Sign Up
              </button>
              <button className="auth-button" onClick={handleLogin}>
                Log In
              </button>
            </>
          )}
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
  );
}

function App() {
  const [userEmail, setUserEmail] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home userEmail={userEmail} />}
        />
        <Route
          path="/signup"
          element={<Signup onSignUp={(email) => setUserEmail(email)} />}
        />
        <Route
          path="/login"
          element={<Login onLogIn={(email) => setUserEmail(email)} />}
        />
        <Route path="/group" element={<Group />} />
      </Routes>
    </Router>
  );
}

export default App;
