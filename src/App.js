import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Group from "./Group";
import Signup from "./Signup";
import Login from "./Login";

function Home({ userEmail }) {
  const navigate = useNavigate();
  const [groupSize, setGroupSize] = useState(1); // Default group size

  const handleProceed = () => {
    navigate("/group", { state: { groupSize } }); // Pass group size via state
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="top-left">GD++</div>
        <div className="auth-buttons">
          {userEmail ? (
            <span className="user-email">Hey {userEmail}</span>
          ) : (
            <div className="top-right">
              <button className="auth-button" onClick={handleSignUp}>
                Sign Up
              </button>
              <button className="auth-button" onClick={handleLogin}>
                Log In
              </button>
            </div>
          )}
        </div>
        <div className="title-container">
          <h1 className="app-title">GDPlus+</h1>
        </div>
      </header>

      <div className="topics-section">
        <div className="topics-title">Group Discussion Topic</div>
        <div className="topics-container">
          <div className="topic-card">Cloud Computing</div>
        </div>
        <div className="group-size-section">
          <div className="group-size-title">Choose Number of People in the Group</div>
          <div className="group-size-container">
            {[1, 2, 3].map((size) => (
              <div
                key={size}
                className={`group-size-card ${groupSize === size ? "selected" : ""}`}
                onClick={() => setGroupSize(size)}
              >
                {size} Person{size > 1 ? "s" : ""}
              </div>
            ))}
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
        <Route path="/" element={<Home userEmail={userEmail} />} />
        <Route path="/signup" element={<Signup onSignUp={(email) => setUserEmail(email)} />} />
        <Route path="/login" element={<Login onLogIn={(email) => setUserEmail(email)} />} />
        <Route path="/group" element={<Group />} />
      </Routes>
    </Router>
  );
}

export default App;
