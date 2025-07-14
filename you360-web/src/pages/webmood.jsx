import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

const moodEmojis = {
  happy: "😊",
  sad: "😢",
  angry: "😠",
  fearful: "😨",
  disgusted: "🤢",
  surprised: "😲",
  neutral: "😐",
};

function WebcamMood() {
  const videoRef = useRef(null);
  const [mood, setMood] = useState("happy");
  const [loading, setLoading] = useState(false);

  // Load models on mount
  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");
    };
    loadModels();
  }, []);

  // Start webcam
  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Camera access denied", err);
    }
  };

  // Detect mood
  const detectMood = async () => {
    setLoading(true);
    await startVideo();

    setTimeout(async () => {
      const detection = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (detection && detection.expressions) {
        const sorted = Object.entries(detection.expressions).sort((a, b) => b[1] - a[1]);
        const topExpression = sorted[0][0];
        setMood(topExpression);
      } else {
        setMood("neutral");
      }

      // Stop the video
      const stream = videoRef.current.srcObject;
      stream?.getTracks().forEach((track) => track.stop());

      setLoading(false);
    }, 3000); // wait 3 seconds for camera to stabilize
  };

  return (
    <div className="text-white space-y-2">
      <h3 className="text-lg font-semibold">Mood Detection via Webcam</h3>

      <p className="text-2xl">
        {moodEmojis[mood]} {mood.charAt(0).toUpperCase() + mood.slice(1)}
      </p>

      <button
        onClick={detectMood}
        className="mt-2 px-4 py-2 bg-emerald-400 text-black font-semibold rounded hover:bg-emerald-300 transition"
        disabled={loading}
      >
        {loading ? "😶 Detecting..." : "Analyze Mood"}
      </button>

      {/* Hidden video */}
      <video ref={videoRef} autoPlay muted width="320" height="240" style={{ display: "none" }} />
    </div>
  );
}

export default WebcamMood;
