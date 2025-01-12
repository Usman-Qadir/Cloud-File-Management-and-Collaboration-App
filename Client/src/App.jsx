import { useState } from 'react';
import './App.css';

function App() {
  const [selectedFiles, setSelectedFiles] = useState(null);

  const selectedFilesHandler = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setSelectedFiles(files);
    }
  };

  const uploadHandler = async () => {
    if (!selectedFiles) {
      alert("Select a file first");
      return;
    }

    const formData = new FormData();
    // Append each file to FormData
    Array.from(selectedFiles).forEach((file, index) => {
      formData.append(`file${index + 1}`, file);
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
      <div className="header">
        <h2>Upload Your Files</h2>
      </div>

      <div className="drag-drop-box">
        Drag and drop your files here
      </div>

      <label className="select-button" htmlFor="fileInput">
        Select files from computer
      </label>
      <input
        type="file"
        id="fileInput"
        name="file"
        style={{ display: "none" }} // Hide the input element
        multiple
        onChange={selectedFilesHandler} // Handle file selection
      />

     {/* Conditionally render the selected files preview */}
     {selectedFiles && selectedFiles.length > 0 && (
        <div className="selected-files-preview">
          <h3>Selected Files:</h3>
          <ul>
            {Array.from(selectedFiles).map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      <button  className = "upload button" onClick={uploadHandler}>Upload Files</button>
    </div>
  );
}

export default App;
