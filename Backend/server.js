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
        else if(parsedUrl.pathname === '/manage-exhibits' && req.method === 'PUT'){
            employeeRoutes(req, res);
        }
        else if(parsedUrl.pathname === '/complaints' && req.method === 'POST'){
            employeeRoutes(req, res);
        }
        else if(parsedUrl.pathname === '/complaints' && req.method === 'GET'){
            employeeRoutes(req, res);
        }
        else if(parsedUrl.pathname === '/login' && req.method === 'POST'){
            employeeRoutes(req, res);
        }
        else if(parsedUrl.pathname === '/signup' && req.method === 'POST'){
            employeeRoutes(req, res);
        }
        else if(parsedUrl.pathname.startsWith('/customer/') && req.method === 'GET') {
            employeeRoutes(req, res);
        }
        else if(parsedUrl.pathname === '/decodeToken' && req.method === 'POST'){
            employeeRoutes(req, res);
        }
        else if(parsedUrl.pathname.startsWith('/editCustomerInfo/') && req.method === 'PUT'){
            employeeRoutes(req, res);
        }
        else if(parsedUrl.pathname.startsWith('/manage-giftshop') && req.method === 'POST'){
            employeeRoutes(req, res);
        }
        else if(parsedUrl.pathname.startsWith('/manage-giftshop') && req.method === 'GET'){
            employeeRoutes(req, res);
        }
        else if(parsedUrl.pathname.startsWith('/manage-giftshop') && req.method === 'PUT'){
            employeeRoutes(req, res);
        }
        else if(parsedUrl.pathname.startsWith('/manage-giftshop') && req.method === 'DELETE'){
            employeeRoutes(req, res);
        }
        else if(parsedUrl.pathname.startsWith('/manage-artworks') && req.method === 'GET'){
            employeeRoutes(req, res);
        }
        else if(parsedUrl.pathname.startsWith('/manage-artworks') && req.method === 'PUT'){
            employeeRoutes(req, res);
        }
        else if(parsedUrl.pathname.startsWith('/manage-artworks') && req.method === 'POST'){
            employeeRoutes(req, res);
        }
        else if(parsedUrl.pathname.startsWith('/giftshop') && req.method === 'GET'){
            employeeRoutes(req, res);
        }
        else if(parsedUrl.pathname.startsWith('/manage-restaurant') && req.method === 'GET'){
            employeeRoutes(req, res);
        }
        else if(parsedUrl.pathname.startsWith('/manage-restaurant') && req.method === 'POST'){
            employeeRoutes(req, res);
        }
        else if(parsedUrl.pathname.startsWith('/manage-restaurant') && req.method === 'PUT'){
            employeeRoutes(req, res);
        }
        else if(parsedUrl.pathname.startsWith('/getFirstName') && req.method === 'POST'){
            employeeRoutes(req, res);
        }
        else if(parsedUrl.pathname.startsWith('/employee-department') && req.method === 'POST'){
            employeeRoutes(req, res);
        }
        else if (req.url.startsWith('/admin') && req.method === 'GET') {
            // Get the hash from the URL
            const hash = new URL(req.url, `http://localhost:3000`).hash;
        
            // Check if the hash is '#notifications'
            if (hash === '#notifications') {
                // Handle the notifications route
                // For example, call a function or send a response
            } else {
                // Handle other admin routes
                employeeRoutes(req, res);
            }
        }
        else if(parsedUrl.pathname.startsWith('/exhibit-report') && req.method === 'GET'){
            employeeRoutes(req, res);
        }
        else if(parsedUrl.pathname.startsWith('/order-confirmed') && req.method === 'POST'){
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