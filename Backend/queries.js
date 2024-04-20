//basically add any possible query we may need here
const checkEmailExists = "SELECT * FROM employees WHERE email = ?";
const getBranchDirectors = "SELECT * FROM branch_directors";
const getDirectorIdByDepartment = "SELECT Director_ID FROM branch_directors WHERE Branch_title = ?";
const getEmployees = "SELECT * FROM employees";
const addEmployee = "INSERT INTO employees (department, director_id, email, first_name, last_name) VALUES (?, ?, ?, ?, ?)";
const getExhibit = "SELECT * FROM exhibits";
const addExhibit = "INSERT INTO exhibits (Description, Collections, Location, Director_ID) VALUES (?, ?, ?, ?)";
const updateExhibit = "UPDATE exhibits SET Description = ?, Collections = ?, Location = ?, Director_ID = ? WHERE Exhibit_id = ?";
const markExhibitForDeletion ="UPDATE exhibits SET active = 0 WHERE Exhibit_id = ?";
const markEmployeeForDeletion ="UPDATE employees SET Active = 0 WHERE employee_id = ?";
const addComplaint = 'INSERT INTO complaints (name, branch, exhibit_id, customer_id, description) VALUES (?, ?, ?, ?, ?)';
const updateEmployeeInfo = "UPDATE employees SET department = ?, director_id = ?, email = ?, first_name = ?, last_name = ? WHERE employee_id = ?";
const addCustomer = "INSERT INTO customers (first_name, last_name, email, phone_number, username, password) VALUES (?, ?, ?, ?, ?, ?)";
const getCustomerInfo = "SELECT * FROM customers WHERE customer_id = ?";
const updateCustomerInfo = "UPDATE customers SET first_name = ?, last_name = ?, email = ?, phone_number = ?, gender = ?, accessibility_needs = ?, address = ?, date_of_birth = ? WHERE customer_id = ?";
const addItem = "INSERT INTO items (title, price, description, quantity, image_url) VALUES(?, ?, ?, ?, ?)";
const getItem ="SELECT * FROM items";
const updateItem = "UPDATE items SET title = ?, price = ?, description = ?, quantity = ?, image_url = ? WHERE item_id= ?";
const deleteItem = "DELETE FROM items WHERE item_id = ?";
const getArtWorks = "SELECT * FROM art_pieces";
const updateArtWork = "UPDATE art_pieces SET title = ?, artist = ?, image = ?, medium = ?, creationDate = ? WHERE art_id = ?";
const markArtWorkForDeletion ="UPDATE art_pieces SET active = 0 WHERE art_id = ?";
const addArtWork = "INSERT INTO art_pieces (title, artist, creationDate, medium, image) VALUES (?, ?, ?, ?, ?)";
const addFood = "INSERT INTO restaurant (name, description, image, price) VALUES(?, ?, ?, ?)";
const markFoodForDeletion ="UPDATE restaurant SET active = 0 WHERE restaurant_id = ?";
const updateFood = "UPDATE restaurant SET name = ?, description = ?, image = ?, price = ? WHERE restaurant_id = ?";
const getFood = "SELECT * FROM restaurant";
const getMessages = "SELECT * FROM message_queue";
const getEmployeeDepartment = "SELECT department FROM employees WHERE employee_id = ?";
const addOrder = "INSERT INTO orders (customer_id, item_id, quantity, total_price, order_date) VALUES (?, ?, ?, ?, ?)";
const getComplaints = `
    SELECT 
    complaints.complaint_id,
    customers.first_name,
    customers.last_name,
    complaints.branch,
    complaints.description,
    complaints.date_and_time
        FROM 
        complaints
    INNER JOIN 
    customers ON complaints.customer_id = customers.customer_id
  `;
const getFirstName = `
SELECT 
    CASE 
        WHEN ? = 'branch_directors' THEN 
            (SELECT first_name FROM branch_directors WHERE Director_id = ?)
        WHEN ? = 'employees' THEN 
            (SELECT first_name FROM employees WHERE employee_id = ?)
        WHEN ? = 'customers' THEN 
            (SELECT first_name FROM customers WHERE customer_id = ?)
        ELSE NULL 
    END AS first_name`;


const authenticateUser = `
(SELECT Director_id AS user_id, 'branch_directors' AS table_name
FROM branch_directors
WHERE username = ? AND password = ?)
UNION
(SELECT customer_id AS user_id, 'customers' AS table_name
FROM customers
WHERE username = ? AND password = ?)
UNION
(SELECT employee_id AS user_id, 'employees' AS table_name
FROM employees
WHERE username = ? AND password = ?)`;

const exhibitReport = `SELECT 
e.Description AS Exhibit_Name,
COUNT(t.Ticket_id) AS Tickets_Bought,
SUM(t.Price) AS Amount_Made,
COUNT(c.complaint_id) AS Complaints_Received
FROM 
exhibits e
LEFT JOIN 
tickets t ON e.Exhibit_id = t.exhibit_id
LEFT JOIN 
complaints c ON e.Exhibit_id = c.exhibit_id
GROUP BY 
e.Exhibit_id, e.Description;

`;

module.exports = {
    getBranchDirectors,
    getEmployees,
    addEmployee,
    updateEmployeeInfo,
    markEmployeeForDeletion,
    checkEmailExists,
    getDirectorIdByDepartment,
    getExhibit,
    addExhibit,
    markExhibitForDeletion,
    updateExhibit,
    getComplaints,
    addComplaint,
    authenticateUser,
    addCustomer,
    getCustomerInfo,
    updateCustomerInfo,
    addItem,
    getItem,
    updateItem,
    deleteItem,
    getArtWorks,
    updateArtWork,
    markArtWorkForDeletion,
    addArtWork,
    addFood,
    markFoodForDeletion,
    updateFood,
    getFood,
    getFirstName,
    getEmployeeDepartment,
    getMessages,
    exhibitReport,
    addOrder
};