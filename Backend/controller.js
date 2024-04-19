const pool = require("./db.js");
const queries = require("./queries.js");
const jwt = require('jsonwebtoken');

const getBranchDirectors = (req, res) => {
  pool.query(queries.getBranchDirectors, (error, results) => {
    if (error) {
      console.error("Error fetching branch directors:", error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal server error" }));
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(results));
  });
};

const getEmployees = (req, res) => {
  pool.query(queries.getEmployees, (error, results) => {
    if (error) {
      console.error("Error fetching Employees:", error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal server error" }));
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(results));
  });
};

const addEmployee = (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const parsedBody = JSON.parse(body);
    const { department, email, first_name, last_name } = parsedBody;

    // Check if department, fname, lname, and email are defined
    if (!department || !first_name || !last_name || !email) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          error: "Department, first name, last name, and email are required.",
        })
      );
      return;
    }

    // Retrieve director_id based on department
    pool.query(
      queries.getDirectorIdByDepartment,
      [department],
      (error, directorResults) => {
        if (error) {
          console.error("Error retrieving director ID:", error);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Internal server error" }));
          return;
        }

        // Ensure director_id is found
        if (directorResults.length === 0) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              error: "Director not found for the specified department.",
            })
          );
          return;
        }

        const directorId = directorResults[0].Director_ID;

        // Add employee to the database with retrieved director_id
        pool.query(
          queries.addEmployee,
          [department, directorId, email, first_name, last_name],
          (error, results) => {
            if (error) {
              console.error("Error adding employee:", error);
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: "Internal server error" }));
              return;
            }

            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({ message: "Employee created successfully!" })
            );
          }
        );
      }
    );
  });
};


const getExhibits = (req, res) => {
  pool.query(queries.getExhibit, (error, results) => {
    if (error) {
      console.error("Error fetching Employees:", error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal server error" }));
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(results));
  });
};

const addExhibits = (req, res) => {
    let body = "";
    
    req.on("data", (chunk) => {
        body += chunk.toString();
    });
    
    req.on("end", () => {
        const parsedBody = JSON.parse(body);
        const { Exhibit_id, Description, Collections, Location, Director_ID } = parsedBody;
    
        // Check if exhibit_name, exhibit_description, and exhibit_image are defined
        if (!Exhibit_id || !Description || !Collections || !Location || !Director_ID) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
            JSON.stringify({
            error: "Exhibit_id, Description, Collection, Location, and Director_ID are required.",
            })
        );
        return;
        }
    
        // Add exhibit to the database
        pool.query(
        queries.addExhibit,
        [Exhibit_id, Description, Collections, Location, Director_ID],
        (error, results) => {
            if (error) {
                console.error('Error adding exhibit:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal server error' }));
                return;
            }
    
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(
            JSON.stringify({ message: "Exhibit created successfully!" })
            );
        }
        );
    });
    }

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

const insertComplaints = (req, res) => {
  let body = '';

  // Listen for data chunks in the request body
  req.on('data', chunk => {
      body += chunk.toString();
  });

  // Once all data is received, parse the JSON body
  req.on('end', () => {
      // Parse the JSON body
      const requestBody = JSON.parse(body);

      // Extract complaint details from the request body
      const { name, branch, description } = requestBody;

      // Insert complaint into the database using the query from the queries file
      pool.query(
          queries.addComplaint, // Use the query from the queries file
          [name, branch, description],
          (error, results) => {
              if (error) {
                  console.error('Error inserting complaint:', error);
                  res.writeHead(500, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: 'Internal server error' }));
              } else {
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ message: 'Complaint inserted successfully' }));
              }
          }
      );
  });
};

const updateEmployeeInfo = (requestData, res) => {
  try {
      const { department, email, first_name, last_name, employee_id } = requestData;

      pool.query(
          queries.getDirectorIdByDepartment,
          [department],
          (error, directorResults) => {
              if (error) {
                  console.error("Error retrieving director ID:", error);
                  res.writeHead(500, { "Content-Type": "application/json" });
                  res.end(JSON.stringify({ error: "Internal server error" }));
                  return;
              }

              // Ensure director_id is found
              if (directorResults.length === 0) {
                  res.writeHead(400, { "Content-Type": "application/json" });
                  res.end(
                      JSON.stringify({
                          error: "Director not found for the specified department.",
                      })
                  );
                  return;
              }

              const directorId = directorResults[0].Director_ID;

              pool.query(
                  queries.updateEmployeeInfo, // Use the query from the queries file
                  [department, directorId, email, first_name, last_name, employee_id],
                  (error, results) => {
                      if (error) {
                          console.error('Error updating employee information:', error);
                          res.writeHead(500, { 'Content-Type': 'application/json' });
                          res.end(JSON.stringify({ error: 'Internal server error' }));
                      } else {
                          res.writeHead(200, { 'Content-Type': 'application/json' });
                          res.end(JSON.stringify({ message: 'Employee information updated successfully' }));
                      }
                  }
              );
          }
      );
  } catch (error) {
      console.error('Error parsing request body:', error);
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid request body' }));
  }
};

const getComplaints = (req, res) => {
  pool.query(queries.getComplaints, (error, results) => {
    if (error) {
      console.error("Error fetching Complaints:", error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal server error" }));
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(results));
  });
};

const authenticateUser = (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const parsedBody = JSON.parse(body);
    const { username, password } = parsedBody;

    // Check if username and password are provided
    if (!username || !password) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          error: "Both username and password are required.",
        })
      );
      return;
    }

    // Execute the database query to authenticate the user
    pool.query(
      queries.authenticateUser,
      [username, password],
      (error, results) => {
        if (error) {
          console.error("Error authenticating user:", error);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Internal server error" }));
          return;
        }

        if (results.length === 0) {
          res.writeHead(401, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Invalid username or password" }));
          return;
        }

        const userId = results[0].customer_id;
        const token = jwt.sign({ userId }, 'your_secret_key', { expiresIn: '7d' });

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "User authenticated successfully", token }));
      }
    );
  });
};


const addCustomer = (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const parsedBody = JSON.parse(body);
    const { first_name, last_name, email, phone_number, username, password } = parsedBody;

    // Check if all required fields are defined
    if (!first_name || !last_name || !email || !phone_number || !username || !password) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          error: "All fields (first name, last name, email, phone number, username, password) are required.",
        })
      );
      return;
    }

    // Execute the database query to insert the customer
    pool.query(
      queries.addCustomer,
      [first_name, last_name, email, phone_number, username, password],
      (error, results) => {
        if (error) {
          console.error("Error adding customer:", error);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Internal server error from addCustomers" }));
          return;
        }

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ message: "Customer created successfully!" })
        );
      }
    );
  });
};

const getCustomerInfo = (customerId, res) => {
  // Execute the database query to fetch customer information
  pool.query(
    queries.getCustomerInfo,
    [customerId],
    (error, results) => {
      if (error) {
        console.error("Error fetching customer information:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal server error" }));
        return;
      }

      if (results.length === 0) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Customer not found" }));
        return;
      }

      const customerInfo = results[0]; // Assuming there's only one customer with this ID
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(customerInfo));
    }
  );
};

const decodeToken = (req, res) => {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString(); // convert Buffer to string
  });
  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      const token = data.token; // Assuming the token is sent in the request body

      // Verify the token and decode its payload
      const decoded = jwt.verify(token, 'your_secret_key');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ decoded }));
    } catch (error) {
      console.error('Error decoding token:', error);
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid token' }));
    }
  });
};

// const updateCustomerInfo = "UPDATE customers SET first_name = ?, last_name = ?, email = ?, phone_number = ?, gender = ?, accessibility_needs = ?, address = ?, date_of_birth = ? WHERE customer_id = ?";

const updateCustomerInfo = (customer_id, req, res) => {
  // Extract customer data from the request body
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString(); // convert Buffer to string
  });
  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      const { first_name, last_name, email, phone_number, gender, accessibility_needs, address, date_of_birth } = data;

      // Update the customer information in the database
      pool.query(
        queries.updateCustomerInfo,
        [first_name, last_name, email, phone_number, gender, accessibility_needs, address, date_of_birth, customer_id],
        (error, results) => {
          if (error) {
            console.error('Error updating customer information:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Customer information updated successfully' }));
          }
        }
      );
    } catch (error) {
      console.error('Error parsing request body:', error);
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid request body' }));
    }
  });
};


const addItem = (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const parsedBody = JSON.parse(body);
    const { price, description, quantity, image_url } = parsedBody;

    // Check if price, description, quantity, and image_url are defined
    if (!price || !description || !quantity || !image_url) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          error: "Price, description, quantity, and image URL are required.",
        })
      );
      return;
    }

    // Insert item into the database
    pool.query(
      queries.addItem,
      [price, description, quantity, image_url],
      (error, results) => {
        if (error) {
          console.error("Error adding item:", error);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Internal server error" }));
          return;
        }

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ message: "Item added successfully!" })
        );
      }
    );
  });
};

const getItem = (req, res) => {
  pool.query(queries.getItem, (error, results) => {
    if (error) {
      console.error("Error fetching Items:", error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal server error" }));
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(results));
  });
};

const getTotalSales = (req, res) => {
  pool.query(queries.getTotalSales, (error, results) => {
    if (error) {
      console.error("Error fetching Total Sales:", error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal server error" }));
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    console.log("fetched Total Sales");
    res.end(JSON.stringify(results));
  });
};

module.exports = {
  getBranchDirectors,
  getEmployees,
  addEmployee,
  markEmployeeForDeletion,
  updateEmployeeInfo,
  getExhibits,
  addExhibits,
  markEmployeeForDeletion,
  getComplaints,
  insertComplaints,
  authenticateUser,
  addCustomer,
  getCustomerInfo,
  decodeToken,
  updateCustomerInfo,
  addItem,
  getItem,
  getTotalSales
};