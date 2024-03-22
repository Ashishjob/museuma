import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import '../App.css';
import '../index.css';

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState({
    id: "",
    FirstName: "",
    LastName: "",
    Email: "",
  });
  const [newEmployee, setNewEmployee] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
  });
  const [selectedEmployeeForDeletion, setSelectedEmployeeForDeletion] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [branches, setBranches] = useState([]); // New state variable for branches

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee({ ...editedEmployee, [name]: value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedEmployees = employees.map((employee) =>
      employee.id === editedEmployee.id ? { ...employee, ...editedEmployee } : employee
    );
    setEmployees(updatedEmployees);
    setSelectedEmployee(null);
    setShowEditForm(false);
  };


  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    setNewEmployee({
      FirstName: "",
      LastName: "",
      Email: "",
    });
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      const simulatedData = [
        { id: 1, FirstName: "John", LastName: "Doe", Email: "john@example.com", Branch: { id: 1, name: "Branch 1" } },
        { id: 2, FirstName: "Jane", LastName: "Doe", Email: "jane@example.com", Branch: { id: 2, name: "Branch 2" } },
      ];
      setEmployees(simulatedData);
    };

    fetchEmployees();
  }, []);

  const addEmployee = () => {
    const newEmp = {
      id: Date.now(),
      FirstName: newEmployee.FirstName,
      LastName: newEmployee.LastName,
      Email: newEmployee.Email,
    };
    setEmployees([...employees, newEmp]);
    toggleAddForm();
  };

  const deleteEmployee = (employee) => {
    setSelectedEmployeeForDeletion(employee);
  };


  const confirmDelete = () => {
    const updatedEmployees = employees.filter((employee) => employee.id !== selectedEmployeeForDeletion.id);
    setEmployees(updatedEmployees);
    setSelectedEmployeeForDeletion(null);
  };

  const editEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowEditForm(true);
    setEditedEmployee({
      id: employee.id,
      FirstName: employee.FirstName,
      LastName: employee.LastName,
      Email: employee.Email,
    });
  };

  useEffect(() => {
    const fetchBranches = async () => {
      // Replace this with actual fetch from your backend or data source
      const simulatedBranchesData = [
        { id: 1, name: "Branch 1" },
        { id: 2, name: "Branch 2" },
        // ... other branches ...
      ];
      setBranches(simulatedBranchesData);
    };

    fetchBranches();
  }, []);

  return (
    <main className="min-h-screen bg-[#EFEDE5] w-screen flex justify-center">
      <div className="container mx-auto p-6">
        <Link to="/admin" className="absolute top-32 left-10 inline-block text-2xl text-[#313639] hover:text-[#C0BAA4]">
          <FaArrowLeft />
        </Link>
        <h1 className="text-4xl text-center mb-6 mt-24 text-[#313639]">Employee Management</h1>

        <ul className="divide-y divide-gray-300 mb-6">
          {employees.map((employee) => (
            <li key={employee.id} className="py-4 flex">
              <div className="flex flex-col">
                <span className="text-2xl">{`${employee.FirstName} ${employee.LastName}`}</span>
                <span className="text-xl">{employee.Email}</span>
                <span className="text-xl">{employee.Branch ? employee.Branch.name : 'N/A'}</span>
              </div>
              <div className="ml-auto flex">
                <button
                  onClick={() => editEmployee(employee)}
                  className="mr-2"
                >
                  <FaEdit className="hover:text-[#C0BAA4] text-2xl" />
                </button>
                <button
                  onClick={() => deleteEmployee(employee)}
                >
                  <FaTrash className="hover:text-[#C0BAA4] text-2xl" />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <button
          onClick={toggleAddForm}
          className="text-3xl mb-4 hover:text-[#C0BAA4]"
        >
          {showAddForm ? "Cancel" : "Add Employee"}
        </button>

        {showAddForm && (
          <div className="flex">
            <div className="mb-6 flex">
              <input
                type="text"
                placeholder="First Name"
                className="border rounded mr-2 p-2 flex-1"
                value={newEmployee.FirstName}
                onChange={(e) => setNewEmployee({ ...newEmployee, FirstName: e.target.value })}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="border rounded mr-2 p-2 flex-1"
                value={newEmployee.LastName}
                onChange={(e) => setNewEmployee({ ...newEmployee, LastName: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                className="border rounded mr-2 p-2 flex-1"
                value={newEmployee.Email}
                onChange={(e) => setNewEmployee({ ...newEmployee, Email: e.target.value })}
              />
              <Select
                options={branches.map(branch => ({ value: branch.id, label: branch.name }))}
                onChange={selectedOption => setNewEmployee({
                  ...newEmployee,
                  Branch: branches.find(branch => branch.id === selectedOption.value),
                })}
                className="flex-1 mr-2"
                placeholder="Select Branch"
                styles={{
                  control: (provided) => ({
                    ...provided,
                    height: '100%',
                    minHeight: '38px',
                  }),
                }}
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

        {selectedEmployeeForDeletion && (
          <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-md">
              <p className="mb-4">Are you sure you want to delete this employee?</p>
              <div className="flex justify-between">
                <button onClick={() => setSelectedEmployeeForDeletion(null)} className="admin-button mr-2">Cancel</button>
                <button onClick={confirmDelete} className="admin-button bg-red-500 hover:bg-red-700">Delete</button>
              </div>
            </div>
          </div>
        )}

        {showEditForm && selectedEmployee && (
          <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-md w-1/3">
              <h2 className="text-2xl mb-4">Edit Employee</h2>
              <form onSubmit={handleEditSubmit}>
                <div className="mb-4">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="FirstName"
                    className="mt-1 p-2 border rounded-md w-full"
                    value={editedEmployee.FirstName}
                    onChange={handleEditInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="LastName"
                    className="mt-1 p-2 border rounded-md w-full"
                    value={editedEmployee.LastName}
                    onChange={handleEditInputChange}
                  />
                </div>
                <label htmlFor="Branch" className="mt-4 block text-sm font-medium text-gray-700">Branch</label>
                <Select
                  id="branch"
                  name="Branch"
                  options={branches.map(branch => ({ value: branch.id, label: branch.name }))}
                  value={editedEmployee.Branch ? { value: editedEmployee.Branch.id, label: editedEmployee.Branch.name } : null}
                  onChange={selectedOption => handleEditInputChange({
                    target: {
                      name: 'Branch',
                      value: branches.find(branch => branch.id === selectedOption.value),
                    },
                  })}
                />
                <div className="my-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="Email"
                    className="mt-1 p-2 border rounded-md w-full"
                    value={editedEmployee.Email}
                    onChange={handleEditInputChange}
                  />
                </div>
                <div className="flex justify-end">
                  <button type="button" onClick={() => setShowEditForm(false)} className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-[#313639] hover:bg-[#C0BAA4] text-white rounded-md">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ManageEmployees;
