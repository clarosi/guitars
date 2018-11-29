const http = require('http');
const app = require('./app');

// Set up port for server to listen on
const port = process.env.PORT || 3002;

// Create a server
const server = http.createServer(app);

// Run the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});