import { useState } from "react";
import "./App.css";

function App() {
  const [selectedFiles, setSelectedFiles] = useState(null);

  // Handle file selection
  const selectedFilesHandler = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setSelectedFiles(files); // Update state with selected files
    }
  };

  // Handle file upload
  const uploadHandler = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      alert("Please select at least one file.");
      return;
    }

    const formData = new FormData();

    // Append each file to FormData with the key "file"
    Array.from(selectedFiles).forEach((file) => {
      formData.append("file", file); // Use the same key for all files
    });

    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Files uploaded successfully!");
        console.log("Uploaded Files:", result);
      } else {
        alert("Failed to upload the files.");
        console.error(result);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h2>Upload Your Files</h2>
      </header>

      {/* Drag and Drop Box */}
      <div className="drag-drop-box">
        Drag and drop your files here
      </div>

      {/* File Input and Label */}
      <label htmlFor="fileInput" className="select-button">
        Select files from computer
      </label>
      <input
        type="file"
        id="fileInput"
        name="file"
        style={{ display: "none" }} // Hide the input element
        multiple // Allow multiple file selection
        onChange={selectedFilesHandler}
      />

      {/* Selected Files Preview */}
      {selectedFiles && selectedFiles.length > 0 && (
        <div className="selected-files-preview">
          <h3>Selected Files:</h3>
          <ul>
            {Array.from(selectedFiles).map((file, index) => (
              <li key={index}>
                {file.name} - {(file.size / 1024).toFixed(2)} KB
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Upload Button */}
      <button className="upload-button" onClick={uploadHandler}>
        Upload Files
      </button>
    </div>
  );
}

export default App;
