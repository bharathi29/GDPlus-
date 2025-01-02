import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp({ onSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    // Simulated sign-up process
    if (email && password) {
      onSignUp(email); // Pass the email to the parent component (App.js)
      navigate("/"); // Redirect to Home (App.js)
    } else {
      setError("Please fill in all fields.");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSignUp}>
        <h2>Sign Up</h2>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
