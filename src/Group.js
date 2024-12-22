import React from "react";
import "./App.css"; // Reuse the same styles or create new ones if necessary

function Group() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="app-title">Welcome to Group Discussion</h1>
        <p className="subtitle">This is where your group discussion begins.</p>
      </header>
      <div className="topics-section">
        <p className="topics-title">Prepare and collaborate with your group members!</p>
      </div>
    </div>
  );
}

export default Group;
