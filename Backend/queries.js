//basically add any possible query we may need here
const checkEmailExists = "SELECT * FROM employees WHERE email = ?";
const getBranchDirectors = "SELECT * FROM branch_directors";
const getDirectorIdByDepartment = "SELECT Director_ID FROM branch_directors WHERE Branch_title = ?";
const getEmployees = "SELECT * FROM employees";
const addEmployee = "INSERT INTO employees (department, director_id, email, first_name, last_name) VALUES (?, ?, ?, ?, ?)";
const getExhibit = "SELECT * FROM exhibits";
const addExhibit = "INSERT INTO exhibits (Exhibit_id, Description, Collections, Location, Director_ID) VALUES (?, ?, ?, ?, ?)";
const markEmployeeForDeletion ="UPDATE employees SET Active = 0 WHERE employee_id = ?";
const getComplaints = "SELECT * FROM complaints";
const addComplaint = 'INSERT INTO complaints (name, branch, description) VALUES (?, ?, ?)';
const updateEmployeeInfo = "UPDATE employees SET department = ?, director_id = ?, email = ?, first_name = ?, last_name = ? WHERE employee_id = ?";
// const authenticateUser = "SELECT * FROM customers WHERE username = ? AND password = ?";
const addCustomer = "INSERT INTO customers (first_name, last_name, email, phone_number, username, password) VALUES (?, ?, ?, ?, ?, ?)";
const getCustomerInfo = "SELECT * FROM customers WHERE customer_id = ?";
const updateCustomerInfo = "UPDATE customers SET first_name = ?, last_name = ?, email = ?, phone_number = ?, gender = ?, accessibility_needs = ?, address = ?, date_of_birth = ? WHERE customer_id = ?";
const addItem = "INSERT INTO items (price, description, quantity, image_url) VALUES(?, ?, ?, ?)";
const getItem ="SELECT * FROM items";
const updateItem = "UPDATE items SET price = ?, description = ?, quantity = ?, image_url = ? WHERE item_id= ?";
const deleteItem = "DELETE FROM items WHERE item_id = ?";
const getArtWorks = "SELECT * FROM art_pieces";
const updateArtWork = "UPDATE art_pieces SET title = ?, artist = ?, image = ?, medium = ?, creationDate = ? WHERE art_id = ?";
const markArtWorkForDeletion ="UPDATE art_pieces SET active = 0 WHERE art_id = ?";
const addArtWork = "INSERT INTO art_pieces (title, artist, creationDate, medium, image) VALUES (?, ?, ?, ?, ?)";


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
    addArtWork
};