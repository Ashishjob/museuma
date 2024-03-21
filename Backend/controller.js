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

const getEmployees = (req, res) => {
    pool.query(queries.getEmployees, (error, results) => {
        if (error) {
            console.error('Error fetching Employees:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
            return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results));
    });
};

const addEmployee = (req, res) => {
    let body = '';
    
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const parsedBody = JSON.parse(body);
        const { department, email, fname, lname } = parsedBody;
        
        // Check if department, fname, lname, and email are defined
        if (!department || !fname || !lname || !email) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Department, first name, last name, and email are required.' }));
            return;
        }

        // Retrieve director_id based on department
        pool.query(queries.getDirectorIdByDepartment, [department], (error, directorResults) => {
            if (error) {
                console.error('Error retrieving director ID:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal server error' }));
                return;
            }

            // Ensure director_id is found
            if (directorResults.length === 0) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Director not found for the specified department.' }));
                return;
            }



            const directorId = directorResults[0];

            // Add employee to the database with retrieved director_id
            pool.query(queries.addEmployee, [department, directorId, email, fname, lname], (error, results) => {
                if (error) {
                    console.error('Error adding employee:', error);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Internal server error' }));
                    return;
                }

                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Employee created successfully!' }));
            });
        });
    });
};



module.exports = {
    getBranchDirectors,
    getEmployees,
    addEmployee
};