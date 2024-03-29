const http = require('http');
const url = require('url');
const cors = require('cors');
const employeeRoutes = require('./routes');

const PORT = 8081;

// Create a CORS middleware
const corsMiddleware = cors();

// Create the HTTP server
const server = http.createServer((req, res) => {
    // Apply CORS middleware to all routes
    corsMiddleware(req, res, () => {
        const parsedUrl = url.parse(req.url, true);
        if (parsedUrl.pathname === '/') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify("From backend side"));
        } else if (parsedUrl.pathname === '/branch-directors' && req.method === 'GET') {
            employeeRoutes(req, res);
        } else if(parsedUrl.pathname === '/manage-employees' && req.method === 'POST'){
            employeeRoutes(req, res);
        }
        else if(parsedUrl.pathname === '/manage-employees' && req.method === 'GET'){
            employeeRoutes(req, res);
        }
        else if(parsedUrl.pathname === '/manage-exhibits' && req.method === 'GET'){
            employeeRoutes(req, res);
        }
        else if(parsedUrl.pathname === '/manage-employees' && req.method === 'PUT'){
            employeeRoutes(req, res);
        }
        else if(parsedUrl.pathname === '/manage-exhibits' && req.method === 'POST'){
            employeeRoutes(req, res);
        }
        else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Route not found' }));
        }
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});