import React, { useState, useEffect } from "react";
import { FaTrash } from 'react-icons/fa'; // Import the trash icon
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../App.css'; // Import your CSS file here for global styles
import '../index.css'; // Import your CSS file here for global styles

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
  });
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    setNewEmployee({
      FirstName: "",
      LastName: "",
      Email: "",
    });
  };

  // useEffect to simulate fetching data
  useEffect(() => {
    // Simulating data fetching
    const fetchEmployees = async () => {
      // Simulated data
      const simulatedData = [
        { id: 1, FirstName: "John", LastName: "Doe", Email: "john@example.com" },
        { id: 2, FirstName: "Jane", LastName: "Doe", Email: "jane@example.com" },
        // Add more simulated data if needed
      ];
      setEmployees(simulatedData);
    };

    fetchEmployees();
  }, []);

  const addEmployee = () => {
    // Simulated function to add employee
    const newEmp = {
      id: Date.now(), // Generating a unique id (simulate backend)
      FirstName: newEmployee.FirstName,
      LastName: newEmployee.LastName,
      Email: newEmployee.Email,
    };
    setEmployees([...employees, newEmp]);
    toggleAddForm();
  };

  const deleteEmployee = (employee) => {
    setSelectedEmployee(employee);
  };

  const confirmDelete = () => {
    // Filter out the selected employee
    const updatedEmployees = employees.filter((employee) => employee.id !== selectedEmployee.id);
    setEmployees(updatedEmployees);
    setSelectedEmployee(null); // Reset selected employee after deletion
  };

  return (
    <main className="h-screen bg-[#EFEDE5] w-screen flex justify-center">
      <div className="container mx-auto p-6">
        <Link to="/admin" className="top-4 -ml-24 text-lg text-[#313639]">&lt; Back</Link>
        <h1 className="text-3xl text-center mb-6 mt-24 text-[#313639]">Employee Management</h1>

        <ul className="divide-y divide-gray-300 mb-6">
          {employees.map((employee) => (
            <li key={employee.id} className="py-4 flex">
              <div className="flex flex-col">
                <span className="font-semibold">{`${employee.FirstName} ${employee.LastName}`}</span>
                <span className="text-sm">{employee.Email}</span>
              </div>
              <button
                onClick={() => deleteEmployee(employee)}
                className="ml-auto"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={toggleAddForm}
          className="text-2xl mb-4"
        >
          {showAddForm ? "Cancel" : "Add Employee"}
        </button>

        {showAddForm && (
          <div className="flex">
            <div className="mb-6">
              <input
                type="text"
                placeholder="First Name"
                className="border rounded mr-2 p-2"
                value={newEmployee.FirstName}
                onChange={(e) => setNewEmployee({ ...newEmployee, FirstName: e.target.value })}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="border rounded mr-2 p-2"
                value={newEmployee.LastName}
                onChange={(e) => setNewEmployee({ ...newEmployee, LastName: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                className="border rounded mr-2 p-2"
                value={newEmployee.Email}
                onChange={(e) => setNewEmployee({ ...newEmployee, Email: e.target.value })}
              />
            </div>
            <button
              onClick={addEmployee}
              className="w-fit p-2 px-4 bg-[#313639] mb-6 text-white rounded-md hover:bg-[#5a5a5a]"
            >
              Submit
            </button>
          </div>
        )}

        {/* Confirmation Modal */}
        {selectedEmployee && (
          <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-md">
              <p className="mb-4">Are you sure you want to delete this employee?</p>
              <div className="flex justify-between">
                <button onClick={() => setSelectedEmployee(null)} className="admin-button mr-2">Cancel</button>
                <button onClick={confirmDelete} className="admin-button bg-red-500 hover:bg-red-700">Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ManageEmployees;
