const http = require('http');
const mysql = require('mysql');
const url = require('url');
const cors = require('cors');

const PORT = 8081;

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "bakermuseum.mysql.database.azure.com",
    user: 'mrbaker',
    password: 'Meowmeow!!!',
    database: 'museum',
    ssl: {
        rejectUnauthorized: true
    }
});


const corsMiddleware = cors();

const server = http.createServer((req, res) => {
    corsMiddleware(req, res, () => {
        const parsedUrl = url.parse(req.url, true);

        if (parsedUrl.pathname === '/') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify("From backend side"));
        } else if (parsedUrl.pathname === '/branch-directors') {
            pool.getConnection((err, connection) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(err));
                    return;
                }

                connection.query("SELECT * FROM branch_directors", (err, data) => {
                    connection.release();

                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(err));
                    } else {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(data));
                    }
                });
            });
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Route not found' }));
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
