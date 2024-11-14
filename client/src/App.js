// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';

// ...rest of your code

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [formattedJson, setFormattedJson] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFormattedJson('');
    try {
      const response = await axios.post('/api/format-json', {
        jsonBlob: jsonInput,
      });
      setFormattedJson(response.data.formattedJson);
    } catch (err) {
      setError(
        err.response && err.response.data.error
          ? err.response.data.error
          : 'An error occurred'
      );
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>JSON Formatter</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="10"
          cols="80"
          placeholder="Paste your JSON here..."
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          required
        ></textarea>
        <br />
        <button type="submit">Format JSON</button>
      </form>
      {error && (
        <div style={{ color: 'red', marginTop: '20px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      {formattedJson && (
        <div style={{ marginTop: '20px' }}>
          <strong>Formatted JSON:</strong>
          <SyntaxHighlighter language="json" style={coy}>
            {formattedJson}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
}

export default App;