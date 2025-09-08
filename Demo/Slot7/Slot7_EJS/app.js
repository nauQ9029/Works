const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const articles = require('./data.json');

// Cấu hình EJS as a view engine
// Tells Express to look for .ejs files in the ./views directory
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware to parse JSON bodies in HTTP requests
app.use(bodyParser.json());

// Route chính
app.get('/', (req, res) => {
    // Renders the articles.ejs view and passing in the articles data.
    res.render('articles', { articles });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
