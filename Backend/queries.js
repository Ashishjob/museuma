//basically add any possible query we may need here
const getBranchDirectors = "SELECT * FROM branch_directors";
const addEmployee = "INSERT INTO employees (department, position) VALUES ($1, $2)";

module.exports = {
    getBranchDirectors,
    addEmployee
};

