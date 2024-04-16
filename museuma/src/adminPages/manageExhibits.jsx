import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Select from "react-select"; // Import react-select
import "../App.css";
import "../index.css";

const ManageExhibits = () => {
  const [exhibits, setExhibits] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editedExhibit, setEditedExhibit] = useState({
    Exhibit_id: "",
    Description: "",
    Collections: "",
    Location: "",
    Director_ID: "",
  });
  const [newExhibit, setNewExhibit] = useState({
    Exhibit_id: "",
    Description: "",
    Collections: "",
    Location: "",
    Director_ID: "",
  });
  const [selectedExhibitForDeletion, setSelectedExhibitForDeletion] =
    useState(null);
  const [selectedExhibit, setSelectedExhibit] = useState(null);

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedExhibit({ ...editedExhibit, [name]: value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedExhibits = exhibits.map((exhibits) =>
      exhibits.id === editedExhibit.id
        ? { ...exhibits, ...editedExhibit }
        : exhibits
    );
    setExhibits(updatedExhibits);
    setSelectedExhibit(null);
    setShowEditForm(false);
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    setNewExhibit({
      Exhibit_id: "",
      Description: "",
      Collections: "",
      Location: "",
      Director_ID: "",
    });
  };

  useEffect(() => {
    const fetchExhibits = async () => {
      try {
        const response = await fetch(
          "https://museuma.onrender.com/manage-exhibits"
        );
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

  const addExhibit = async () => {
    const newEmp = {
      Exhibit_id: newExhibit.Exhibit_id,
      Description: newExhibit.Description,
      Collections: newExhibit.Collections,
      Location: newExhibit.Location,
      Director_ID: newExhibit.Director_ID,
    };

    console.log(newEmp);

    try {
      const response = await fetch(
        "https://museuma.onrender.com/manage-exhibits",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEmp),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add exhibit");
      }

      // If successful, update the state and toggle the form
      // Fetch the updated list of exhibits
      const updatedResponse = await fetch(
        "https://museuma.onrender.com/manage-exhibits"
      );
      if (!updatedResponse.ok) {
        throw new Error("Failed to fetch updated exhibits");
      }
      const updatedData = await updatedResponse.json();

      // Update the state with the new list of exhibits
      setExhibits(updatedData);
      //setExhibits([...exhibits, newEmp]);
      toggleAddForm();
    } catch (error) {
      console.error("Error adding exhibit:", error);
      // Handle error as needed
    }
  };

  const deleteExhibit = (exhibitID) => {
    setSelectedExhibitForDeletion(exhibitID);
  };

  const confirmDelete = () => {
    const updatedExhibits = exhibits.filter(
      (exhibits) => exhibits.exhibits !== selectedExhibitForDeletion
    );
    setExhibits(updatedExhibits);
    setSelectedExhibitForDeletion(null);
  };

  const editExhibit = (exhibit) => {
    setSelectedExhibit(exhibit);
    setShowEditForm(true);
    setEditedExhibit({
      Exhibit_id: exhibit.id,
      Description: exhibit.Description,
      Collections: exhibit.Collections,
      Location: exhibit.Location,
      Director_ID: exhibit.Director_ID,
    });
  };

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
          Exhibit Management
        </h1>

        <button
          onClick={toggleAddForm}
          className="text-3xl mb-4 hover:text-[#C0BAA4]"
        >
          {showAddForm ? "Cancel" : "Add Exhibit"}
        </button>

        <ul className="divide-y divide-gray-300 mb-6">
          {exhibits.map((exhibit) => (
            <li key={exhibit.Exhibit_id} className="py-4 flex">
              <div className="flex flex-col">
                <span className="text-2xl">{exhibit.Description}</span>
                <span className="text-xl">{exhibit.Location}</span>
                <span className="text-xl">{exhibit.Director_ID}</span>
              </div>
              <div className="ml-auto flex">
                <button onClick={() => editExhibit(exhibit)} className="mr-2">
                  <FaEdit className="hover:text-[#C0BAA4] text-2xl" />
                </button>
                <button onClick={() => deleteExhibit(exhibit.Exhibit_id)}>
                  <FaTrash className="hover:text-[#C0BAA4] text-2xl" />
                </button>
              </div>
            </li>
          ))}
        </ul>

        {showAddForm && (
          <div className="flex">
            <div className="mb-6 flex">
              <input
                type="text"
                placeholder="Exhibit ID"
                className="border rounded mr-2 p-2 flex-1"
                value={newExhibit.Exhibit_id}
                onChange={(e) =>
                  setNewExhibit({ ...newExhibit, Exhibit_id: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Description"
                className="border rounded mr-2 p-2 flex-1"
                value={newExhibit.Description}
                onChange={(e) =>
                  setNewExhibit({ ...newExhibit, Description: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Location"
                className="border rounded mr-2 p-2 flex-1"
                value={newExhibit.Location}
                onChange={(e) =>
                  setNewExhibit({ ...newExhibit, Location: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Director ID"
                className="border rounded mr-2 p-2 flex-1"
                value={newExhibit.Director_ID}
                onChange={(e) =>
                  setNewExhibit({ ...newExhibit, Director_ID: e.target.value })
                }
              />
            </div>
            <button
              onClick={addExhibit}
              className="w-fit p-2 px-4 bg-[#313639] mb-6 text-white rounded-md hover:bg-[#5a5a5a]"
            >
              Submit
            </button>
          </div>
        )}

        {selectedExhibitForDeletion && (
          <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-md">
              <p className="mb-4">
                Are you sure you want to delete this exhibit?
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => setSelectedExhibitForDeletion(null)}
                  className="admin-button mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="admin-button bg-red-500 hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {showEditForm && selectedExhibit && (
          <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-md w-1/3">
              <h2 className="text-2xl mb-4">Edit Exhibit</h2>
              <form onSubmit={handleEditSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="Exhibit_id"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Exhibit ID
                  </label>
                  <input
                    type="text"
                    id="Exhibit_id"
                    name="Exhibit_id"
                    className="mt-1 p-2 border rounded-md w-full"
                    value={editedExhibit.Exhibit_id}
                    onChange={handleEditInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="Description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    id="Description"
                    name="Description"
                    className="mt-1 p-2 border rounded-md w-full"
                    value={editedExhibit.Description}
                    onChange={handleEditInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="Location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="Location"
                    name="Location"
                    className="mt-1 p-2 border rounded-md w-full"
                    value={editedExhibit.Location}
                    onChange={handleEditInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="Director_ID"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Director ID
                  </label>
                  <input
                    type="text"
                    id="Director_ID"
                    name="Director_ID"
                    className="mt-1 p-2 border rounded-md w-full"
                    value={editedExhibit.Director_ID}
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

export default ManageExhibits;
