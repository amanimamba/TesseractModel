import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Tesseract from "tesseract.js";
import { useSpeech } from "react-text-to-speech";

function HomePages() {
  const [text, setText] = useState("Pas de text selectionner ");
  const [isProcessing, setIsProcessing] = useState(false);
  const {
    Text, // Component that returns the modified text property
    speechStatus, // String that stores current speech status
    isInQueue, // Boolean that stores whether a speech utterance is either being spoken or present in queue
    start, // Function to start the speech or put it in queue
    pause, // Function to pause the speech
    stop, // Function to stop the speech or remove it from queue
  } = useSpeech({ text: text });

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setIsProcessing(true);
    setText("Traitement en cours...");

    Tesseract.recognize(file, "fra", {
      // 'fra' pour le français, changez si nécessaire
      logger: (info) => console.log(info),
    })
      .then(({ data: { text } }) => {
        setText(text);
        setIsProcessing(false);
      })
      .catch((error) => {
        console.error("Erreur OCR:", error);
        setText("Erreur lors de la reconnaissance.");
        setIsProcessing(false);
      });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Déposez le fichier ici...</p>
        ) : (
          <p>
            Glissez-déposez une image ici, ou cliquez pour sélectionner un
            fichier
          </p>
        )}
      </div>
      {isProcessing && <p>Traitement en cours...</p>}
      <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
        {text}
        <hr />
        {speechStatus !== "started" ? (
          <button onClick={start}>Start</button>
        ) : (
          <button onClick={pause}>Pause</button>
        )}
        <button onClick={stop}>Stop</button>
      </div>
    </div>
  );
}

export default HomePages;
