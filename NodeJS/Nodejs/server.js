const express = require('express');
const app = express();
const port = 8080;

// Middleware to serve static files if needed
app.use(express.static('public'));

// Route for home page
app.get('/', (req, res) => {
res.send('This is home page');
});

// Route for student page
app.get('/student', (req, res) => {
res.send('This is student page');
});

// Route for admin page
app.get('/admin', (req, res) => {
res.send('This is admin page');
});

// Route for JSON response
app.get('/data', (req, res) => {
res.json({ message: 'Hello World JSON' });
});

// Route for invalid requests
app.get('*', (req, res) => {
res.status(400).send('Invalid Request!');
});

// Start the server
app.listen(port, () => {
console.log(`Node.js web server at port ${port} is running..`);
});
