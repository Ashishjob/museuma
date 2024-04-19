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
const getComplaints = "SELECT * FROM complaints";
const addComplaint = 'INSERT INTO complaints (name, branch, description) VALUES (?, ?, ?)';
const updateEmployeeInfo = "UPDATE employees SET department = ?, director_id = ?, email = ?, first_name = ?, last_name = ? WHERE employee_id = ?";
const addCustomer = "INSERT INTO customers (first_name, last_name, email, phone_number, username, password) VALUES (?, ?, ?, ?, ?, ?)";
const getCustomerInfo = "SELECT * FROM customers WHERE customer_id = ?";
const updateCustomerInfo = "UPDATE customers SET first_name = ?, last_name = ?, email = ?, phone_number = ?, gender = ?, accessibility_needs = ?, address = ?, date_of_birth = ? WHERE customer_id = ?";
const addItem = "INSERT INTO items (title, price, description, quantity, image_url) VALUES(?, ?, ?, ?, ?)";
const getItem ="SELECT * FROM items";
const getTotalSales = "SELECT c.first_name, i.title, i.Price, p.purchase_date FROM purchases AS p JOIN items AS i ON p.product_id = i.Item_id JOIN customers AS c ON p.customer_id = c.customer_id UNION ALL SELECT c.first_name, 'Ticket', t.Price, t.Date FROM tickets AS t JOIN customers AS c ON t.customer_id = c.customer_id";
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
    getTotalSales,
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
    getMessages
};