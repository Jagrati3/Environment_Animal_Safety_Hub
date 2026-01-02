const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend/src')));

// Serve the main index.html for any route that doesn't match static files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/src/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
