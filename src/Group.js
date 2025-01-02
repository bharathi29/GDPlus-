import React, { useState } from "react";
import { ReactMic } from "react-mic";
import axios from "axios";

const RASA_LICENSE_KEY = process.env.RASA_PRO_LICENSE;

const Group = () => {
  const [record, setRecord] = useState(false);
  const [discussion, setDiscussion] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const assistants = [
    { name: "AI Assistant 1", endpoint: "http://localhost:5005/webhooks/rest/webhook" },
    { name: "AI Assistant 2", endpoint: "http://localhost:5006/webhooks/rest/webhook" },
    { name: "AI Assistant 3", endpoint: "http://localhost:5007/webhooks/rest/webhook" },
  ];

  const onStop = async (recordedBlob) => {
    setRecord(false);
    setIsProcessing(true);

    // Save audio recording
    const formData = new FormData();
    formData.append("file", recordedBlob.blob, "recording.wav");
    await axios.post("http://localhost:4000/api/save-audio", formData);

    // Transcribe audio
    const response = await axios.post("http://localhost:4000/api/speech-to-text", formData, {
      headers: { Authorization: `Bearer ${RASA_LICENSE_KEY}` },
    });
    const transcription = response.data.transcription;

    // Update discussion
    const humanMessage = { sender: "You", text: transcription };
    setDiscussion((prev) => [...prev, humanMessage]);

    // Fetch AI responses
    const aiResponses = await Promise.all(
      assistants.map(async (assistant) => {
        const res = await axios.post(assistant.endpoint, { message: transcription });
        return { sender: assistant.name, text: res.data[0].text };
      })
    );

    aiResponses.forEach(async (response) => {
      setDiscussion((prev) => [...prev, response]);

      // Play AI responses
      const audioRes = await axios.post("http://localhost:4000/api/text-to-speech", { text: response.text }, {
        responseType: "blob",
      });
      const audioBlob = new Blob([audioRes.data], { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    });

    setIsProcessing(false);
  };

  return (
    <div>
      <div className="discussion">
        {discussion.map((msg, idx) => (
          <div key={idx} className={msg.sender === "You" ? "user-msg" : "ai-msg"}>
            <strong>{msg.sender}: </strong>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="audio-controls">
        <ReactMic
          record={record}
          onStop={onStop}
          mimeType="audio/wav"
          className="audio-input"
        />
        <button onClick={() => setRecord(!record)} disabled={isProcessing}>
          {record ? "Stop Recording" : "Start Recording"}
        </button>
      </div>
      {isProcessing && <p>Processing...</p>}
    </div>
  );
};

export default Group;
