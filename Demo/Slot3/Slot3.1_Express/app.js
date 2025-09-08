const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // Middleware để parse JSON

// Dữ liệu mẫu
let users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
];

// GET: Lấy danh sách users
app.get('/users', (req, res) => {
    res.json(users);
});

// POST: Thêm user mới
app.post('/users', (req, res) => {
    const newUser = { id: users.length + 1, ...req.body };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT: Cập nhật user
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex !== -1) {
        users[userIndex] = { id, ...req.body };
        res.json(users[userIndex]);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// DELETE: Xóa user
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    users = users.filter(u => u.id !== id);
    res.status(204).send();
});

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
