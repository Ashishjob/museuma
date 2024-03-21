const http = require('http');
const url = require('url');
const cors = require('cors');
const db = require('./db');
const studentRoutes = require('./routes');

const PORT = 8081;

const corsMiddleware = cors();

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    if (parsedUrl.pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify("From backend side"));
    } else if (parsedUrl.pathname === '/branch-directors' && req.method === 'GET') {
        studentRoutes(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Route not found' }));
    }
});


server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
