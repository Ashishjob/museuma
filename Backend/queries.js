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
const authenticateUser = "SELECT * FROM customers WHERE username = ? AND password = ?";
const addCustomer = "INSERT INTO customers (first_name, last_name, email, phone_number, username, password) VALUES (?, ?, ?, ?, ?, ?)";
const getCustomerInfo = "SELECT * FROM customers WHERE customer_id = ?";
const updateCustomerInfo = "UPDATE customers SET first_name = ?, last_name = ?, email = ?, phone_number = ?, gender = ?, accessibility_needs = ?, address = ?, date_of_birth = ? WHERE customer_id = ?";

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
    updateCustomerInfo
};