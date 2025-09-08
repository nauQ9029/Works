const express = require('express');
const path = require('path');

const app = express();

// Middleware để phục vụ file tĩnh
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'check.html'));
});

// Routes
app.get('/api/list', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});


app.post('/api', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'post.html'));
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'notfound.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Express server is running on http://localhost:${PORT}`);
});
