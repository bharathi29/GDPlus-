import React, { useState } from "react";
import { ReactMic } from "react-mic";
import axios from "axios";

const Group = () => {
  const [record, setRecord] = useState(false);
  const [discussion, setDiscussion] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [file, setFile] = useState(null);

  // Set your Rasa Developer License Key here (ensure you have the key stored in an env variable for security)
  const RASA_LICENSE_KEY = process.env.RASA_PRO_LICENSE;

  // Speech synthesis function
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US"; // Specify language if needed
    speechSynthesis.speak(utterance);
  };

  const onStop = async (recordedBlob) => {
    try {
      setRecord(false);
      setIsProcessing(true);

      // If a file is provided, process that file
      if (file) {
        const fileContent = await readFileContent(file);

        // Send file content to Rasa for processing using the Developer Key License
        const rasaResponse = await axios.post(
          "http://localhost:5005/webhooks/rest/webhook", 
          { sender: "user", message: fileContent },
          {
            headers: {
              Authorization: `Bearer ${RASA_LICENSE_KEY}`, // Include the Developer Key License in the Authorization header
            },
          }
        );
        
        // Assuming Rasa returns an array of responses
        if (rasaResponse.data.length > 0) {
          const botResponse = rasaResponse.data[0].text;
          setDiscussion((prev) => [...prev, { sender: "Bot", text: botResponse }]);
          
          // Speak out the bot's response
          speak(botResponse);
        }
      }
      setIsProcessing(false);
    } catch (error) {
      console.error("Error processing file:", error);
      setIsProcessing(false);
    }
  };

  // Helper function to read file content
  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file); // Reads file as text (you can change this depending on the file type)
    });
  };

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div>
      <h1>Group Discussion</h1>
      <div className="discussion">
        {discussion.map((msg, idx) => (
          <div key={idx} className={msg.sender === "You" ? "user-msg" : "ai-msg"}>
            <strong>{msg.sender}: </strong>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="audio-controls">
        <ReactMic record={record} onStop={onStop} mimeType="audio/wav" className="audio-input" />
        <button onClick={() => setRecord(!record)} disabled={isProcessing}>
          {record ? "Stop Recording" : "Start Recording"}
        </button>
      </div>
      
      {/* File Upload Section */}
      <div className="file-upload">
        <input type="file" onChange={handleFileChange} />
        {file && <p>File selected: {file.name}</p>}
      </div>

      {isProcessing && <p>Processing...</p>}
    </div>
  );
};

export default Group;
