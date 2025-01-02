import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LogIn({ onLogIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogIn = (e) => {
    e.preventDefault();

    // Simulated login process
    if (email && password) {
      onLogIn(email); // Pass the email to the parent component (App.js)
      navigate("/"); // Redirect to Home (App.js)
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleLogIn}>
        <h2>Log In</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LogIn;
