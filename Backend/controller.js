const pool = require("./db.js");
const queries = require("./queries.js");


const getBranchDirectors = (req, res) => {
    pool.query(queries.getBranchDirectors, (error, results) => {
        if (error) {
            console.error('Error fetching branch directors:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
            return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results));
    });
};



module.exports = {
    getBranchDirectors,
};