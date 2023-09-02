import React, { useState } from 'react';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('csvFile', selectedFile);

      const result = await fetch('/upload', {
        method: 'POST',
        body: formData, // Pass the formData as the 'body' property
      });

      if (result.ok) {
        alert('Data uploaded successfully!');
      }
    } catch (error) {
      alert('Something went wrong!');
    }
  };

  return (
    <div>
      <h1>Upload CSV File</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
}

export default App;
