const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const itemRoutes = require('./routes/itemRoutes');
require('dotenv').config();

const app = express();

// Kết nối MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/items', itemRoutes);
//app.use('/api/Student', itemRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
