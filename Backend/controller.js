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

const markEmployeeForDeletion = (req, res) => {
    let body = '';

    // Listen for data chunks in the request body
    req.on('data', chunk => {
        body += chunk.toString();
    });

    // Once all data is received, parse the JSON body
    req.on('end', () => {
        // Parse the JSON body
        const requestBody = JSON.parse(body);

        // Log the request body
        console.log('Request Body:', requestBody);

        // Extract employee ID from the request body or URL parameters
        const employeeId = requestBody.employee_id; 
        pool.query(queries.markEmployeeForDeletion, [employeeId], (error, results) => {
            if (error) {
                console.error('Error marking employee for deletion:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal server error' }));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Employee marked for deletion' }));
        });
    });
};

const addEmployee = (req, res) => {
    let body = '';
    
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const parsedBody = JSON.parse(body);
        const { department, email, first_name, last_name } = parsedBody;
        
        // Check if department, fname, lname, and email are defined
        if (!department || !first_name || !last_name || !email) {
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

            const directorId = directorResults[0].Director_ID;

            // Add employee to the database with retrieved director_id
            pool.query(queries.addEmployee, [department, directorId, email, first_name, last_name], (error, results) => {
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
    addEmployee,
    markEmployeeForDeletion
};