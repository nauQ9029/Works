const express = require('express');
const connectDB = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware (e.g., JSON parser)
app.use(express.json());

// Example route
app.get('/', (req, res) => {
    res.send('Goodbye, MongoDB + Node.js!');
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
