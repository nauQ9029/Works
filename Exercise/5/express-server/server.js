const express = require('express');
const app = express();
const PORT = 8080;

app.get('/Hello', (req, res) => {
  res.send('Goodbye, World!~');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});