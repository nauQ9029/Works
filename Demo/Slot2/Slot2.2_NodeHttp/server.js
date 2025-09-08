const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const { method, url } = req;

    const sendFile = (filePath, contentType) => {
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content);
            }
        });
    };

    if (url === '/api' && method === 'GET') {
        sendFile(path.join(__dirname, 'public', 'home.html'), 'text/html');
    } else if (url === '/api' && method === 'POST') {
        sendFile(path.join(__dirname, 'public', 'post.html'), 'text/html');
    } else {
        sendFile(path.join(__dirname, 'public', 'notfound.html'), 'text/html');
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
