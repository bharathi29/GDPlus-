import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp({ onSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Simple validation to check if email and password are provided
    if (email && password) {
      try {
        // Send email and password to the backend to store in the database
        const response = await fetch("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }), // Sending email and password to backend
        });

        if (response.ok) {
          // If signup is successful, pass the email to the parent component and redirect
          onSignUp(email);
          navigate("/"); // Redirect to Home (App.js)
        } else {
          const data = await response.json();
          setError(data.message || "Something went wrong. Please try again.");
        }
      } catch (error) {
        setError("Failed to sign up. Please try again.");
      }
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
