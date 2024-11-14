// routes/api.js
const express = require('express');
const router = express.Router();

// POST route to format JSON
router.post('/format-json', (req, res) => {
  const { jsonBlob } = req.body;
  try {
    const parsedJson = JSON.parse(jsonBlob);
    const formattedJson = JSON.stringify(parsedJson, null, 2); // 2-space indentation
    res.json({ formattedJson });
  } catch (error) {
    res.status(400).json({ error: 'Invalid JSON provided' });
  }
});

module.exports = router;