import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaArrowLeft, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import Select from "react-select";
import "../App.css";
import "../index.css";

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [exhibits, setExhibits] = useState([]);
  const [filter, setFilter] = useState('active');
  const [confirmPassword, setConfirmPassword] = useState("");
  const [editedEmployee, setEditedEmployee] = useState({
    department: "",
    email: "",
    first_name: "",
    last_name: "",
  });
  const [newEmployee, setNewEmployee] = useState({
    department: "",
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    phone_number: "",
  });
  const [selectedEmployeeForDeletion, setSelectedEmployeeForDeletion] =
    useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [branches, setBranches] = useState([]); // New state variable for branches

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee({ ...editedEmployee, [name]: value });
  };

  //FIGURE OUT HOW TO CONNECT THE UDPATE EMPLOYEE FUNCTION TO BACKEND LATER
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const { department, email, first_name, last_name, employee_id } =
      editedEmployee;
    console.log(employee_id);
    const updatedEmployeeData = {
      department,
      email,
      first_name,
      last_name,
      employee_id,
    };
    console.log(updatedEmployeeData);
    try {
      const response = await fetch(
        "https://museuma.onrender.com/manage-employees",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "update",
            ...updatedEmployeeData,
          }),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Server error: ${errorMessage}`);
      }

      // Fetch updated data after successful update
      const updatedResponse = await fetch(
        "https://museuma.onrender.com/manage-employees"
      );
      const updatedData = await updatedResponse.json();

      const updatedEmployees = updatedData.filter(
        (employee) => employee.Active === 1
      ); // Assuming Active flag is used to filter active employees
      setEmployees(updatedEmployees);

      setSelectedEmployee(null);
      setShowEditForm(false);
    } catch (error) {
      console.error("Client error:", error.message);
      alert(`Error updating employee: ${error.message}`);
    }
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    setNewEmployee({
      department: "",
      email: "",
      first_name: "",
      last_name: "",
    });
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          "https://museuma.onrender.com/manage-employees"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }
        const data = await response.json();
        const activeEmployees = data.filter(
          (employee) => employee.Active === 1
        );
        setEmployees(activeEmployees);
      } catch (error) {
        console.error("Error fetching employees:", error);
        // Handle error as needed
      }
    };

    fetchEmployees();
  }, []);

  const addEmployee = async () => {
  
    if (newEmployee.password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const newEmp = {
      department: newEmployee.department,
      email: newEmployee.email,
      first_name: newEmployee.first_name,
      last_name: newEmployee.last_name,
      username: newEmployee.username,
      password: newEmployee.password,
      phone_number: newEmployee.phone_number,
    };

    console.log(newEmp);

    try {
      const response = await fetch(
        "http://localhost:8081/manage-employees",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEmp),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add employee");
      }

      // If successful, update the state and toggle the form
      // Fetch the updated list of employees
      const updatedResponse = await fetch(
        "https://museuma.onrender.com/manage-employees"
      );
      if (!updatedResponse.ok) {
        throw new Error("Failed to fetch updated employees");
      }
      const updatedData = await updatedResponse.json();

      const activeEmployees = updatedData.filter(
        (employee) => employee.Active === 1
      );

      // Update the state with the new list of employees
      setEmployees(activeEmployees);
      //setEmployees([...employees, newEmp]);
      toggleAddForm();
    } catch (error) {
      console.error("Error adding employee:", error);
      // Handle error as needed
    }
  };

  const confirmDelete = (employeeID) => {
    setSelectedEmployeeForDeletion(employeeID);
  };

  const deleteConfirmed = async () => {
    console.log("button is hit");
    try {
      // Send PUT request to mark employee for deletion
      const response = await fetch("https://museuma.onrender.com/manage-employees", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "markForDeletion",
          employee_id: selectedEmployeeForDeletion,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to mark employee for deletion");
      }

      // Update state to remove the employee
      const updatedEmployees = employees.filter(
        (employee) => employee.employee_id !== selectedEmployeeForDeletion
      );
      setEmployees(updatedEmployees);
      setSelectedEmployeeForDeletion(null);
    } catch (error) {
      console.error("Error marking employee for deletion:", error);
      // Handle error as needed
    }
  };

  const editEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowEditForm(true);
    console.log("Heres our employee id: ");
    console.log(employee.employee_id);
    setEditedEmployee({
      employee_id: employee.employee_id,
      first_name: employee.first_name,
      last_name: employee.last_name,
      email: employee.email,
      department: employee.department,
    });
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("https://museuma.onrender.com/manage-employees");
        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }
        const data = await response.json();
        const filteredEmployees = data.filter(employee => (filter === 'active' ? employee.Active === 1 : employee.Active === 0));
        setEmployees(filteredEmployees);
      } catch (error) {
        console.error("Error fetching employees:", error);
        // Handle error as needed
      }
    };
    fetchEmployees();
  }, [filter]);

  useEffect(() => {
    const fetchExhibits = async () => {
      try {
        const response = await fetch("https://museuma.onrender.com/manage-exhibits");
        if (!response.ok) {
          throw new Error("Failed to fetch exhibits");
        }
        const data = await response.json();
        setExhibits(data);
      } catch (error) {
        console.error("Error fetching exhibits:", error);
        // Handle error as needed
      }
    };

    fetchExhibits();
  }, []);

  const [viewInactive, setViewInactive] = useState(false);

  const rehireEmployee = async (employeeToRehire) => {
    console.log("Rehire button is hit");
    try {
      // Send PUT request to rehire employee
      const response = await fetch("https://museuma.onrender.com/manage-employees", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "markForRehire",
          employee_id: employeeToRehire.employee_id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to rehire employee");
      }

      // Update state to mark the employee as active
      const updatedEmployees = employees.map((employee) =>
        employee.employee_id === employeeToRehire.employee_id
          ? { ...employee, Active: 1 }
          : employee
      );
      setEmployees(updatedEmployees);
    } catch (error) {
      console.error("Error rehiring employee:", error);
      // Handle error as needed
    }
  };

  const filteredEmployees = employees.filter(employee => viewInactive ? employee.active === 0 : true);

  return (
    <main className="min-h-screen bg-[#EFEDE5] w-screen flex justify-center">
      <div className="container mx-auto p-6">
        <Link
          to="/admin"
          className="absolute top-32 left-10 inline-block text-2xl text-[#313639] hover:text-[#C0BAA4]"
        >
          <FaArrowLeft />
        </Link>
        <h1 className="text-4xl text-center mb-6 mt-24 text-[#313639]">
          Employee Management
        </h1>
        <div className="flex flex-col items-start">
          <button
            onClick={toggleAddForm}
            className="text-3xl mb-2 hover:text-[#C0BAA4]"
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
                  value={newEmployee.first_name}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, first_name: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="border rounded mr-2 p-2 flex-1"
                  value={newEmployee.last_name}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, last_name: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="border rounded mr-2 p-2 flex-1"
                  value={newEmployee.email}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, email: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="border rounded mr-2 p-2 flex-1"
                  value={newEmployee.phone_number}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, phone_number: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="username"
                  className="border rounded mr-2 p-2 flex-1"
                  value={newEmployee.username}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, username: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="border rounded mr-2 p-2 flex-1"
                  value={newEmployee.password}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, password: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="border rounded mr-2 p-2 flex-1"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <select
                  value={newEmployee.department}
                  onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                  className="w-full rounded-xl pl-2 border-[#bfbaa3] border-2"
                >
                  <option value="" disabled hidden>Please select an exhibition</option>
                  {exhibits && exhibits.map((exhibit) => (
                    (exhibit.active === 1) && (
                      <option key={exhibit.Exhibit_id} value={exhibit.Description}>
                        {exhibit.Description}
                      </option>
                    )
                  ))}
                </select>

              </div>
              <button
                onClick={addEmployee}
                className="w-fit p-2 px-4 bg-[#313639] mb-6 text-white rounded-md hover:bg-[#5a5a5a]"
              >
                Submit
              </button>
            </div>
          )}
          <button className="text-2xl mb-4" onClick={() => setFilter(filter === 'active' ? 'inactive' : 'active')}>
            Show {filter === 'active' ? 'Inactive' : 'Active'} Employees
          </button>
        </div>

        <ul className="divide-y divide-gray-300 mb-6">
          {employees.map((employee, index) => (
            <li key={index} className="py-4 flex">
              <div className="flex flex-col">
                <span className="text-2xl">{`${employee.first_name} ${employee.last_name}`}</span>
                <span className="text-xl">{employee.email}</span>
                <span className="text-xl">{employee.department}</span>
              </div>
              <div className="ml-auto flex">
                <button onClick={() => editEmployee(employee)} className="mr-2">
                  <FaEdit className="hover:text-[#C0BAA4] text-2xl" />
                </button>
                {employee.Active === 0 ? (
                  <button onClick={() => rehireEmployee(employee)}>
                    <FaUserPlus className="hover:text-[#C0BAA4] text-2xl" />
                  </button>
                ) : (
                  <button onClick={() => confirmDelete(employee.employee_id)}>
                    <FaTrash className="hover:text-[#C0BAA4] text-2xl" />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>



        {selectedEmployeeForDeletion && (
          <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-md">
              <p className="mb-4">
                Are you sure you want to delete this employee?
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => setSelectedEmployeeForDeletion(null)}
                  className="admin-button mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteConfirmed}
                  className="admin-button bg-red-500 hover:bg-red-700"
                >
                  Delete
                </button>
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
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="first_name"
                    className="mt-1 p-2 border rounded-md w-full"
                    value={editedEmployee.first_name}
                    onChange={handleEditInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="last_name"
                    className="mt-1 p-2 border rounded-md w-full"
                    value={editedEmployee.last_name}
                    onChange={handleEditInputChange}
                  />
                </div>
                <label
                  htmlFor="Branch"
                  className="mt-4 block text-sm font-medium text-gray-700"
                >
                  Branch
                </label>
                <Select
                  id="branch"
                  name="Branch"
                  options={exhibits.map((exhibit) => ({
                    value: exhibit.Description,
                    label: exhibit.Description,
                  }))}
                  value={
                    editedEmployee.exhibit
                      ? {
                        value: editedEmployee.exhibit,
                        label: editedEmployee.exhibit,
                      }
                      : null
                  }
                  onChange={(selectedOption) =>
                    setEditedEmployee({
                      ...editedEmployee,
                      exhibit: selectedOption.value,
                    })
                  }
                />

                <div className="my-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 p-2 border rounded-md w-full"
                    value={editedEmployee.email}
                    onChange={handleEditInputChange}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowEditForm(false)}
                    className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#313639] hover:bg-[#C0BAA4] text-white rounded-md"
                  >
                    Save Changes
                  </button>
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
