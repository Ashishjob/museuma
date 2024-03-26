//basically add any possible query we may need here
const checkEmailExists = "SELECT * FROM employees WHERE email = ?";
const getBranchDirectors = "SELECT * FROM branch_directors";
const getDirectorIdByDepartment = "SELECT Director_ID FROM branch_directors WHERE Branch_title = ?";
const getEmployees = "SELECT * FROM employees";
const addEmployee = "INSERT INTO employees (department, director_id, email, first_name, last_name) VALUES (?, ?, ?, ?, ?)";
const getExhibit = "SELECT * FROM exhibits";

module.exports = {
    getBranchDirectors,
    getEmployees,
    addEmployee,
    checkEmailExists,
    getDirectorIdByDepartment,
    getExhibit
};

