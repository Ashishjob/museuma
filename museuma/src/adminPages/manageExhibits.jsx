import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaArrowLeft, FaRecycle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../App.css";
import "../index.css";

const ManageExhibits = () => {
  const [exhibits, setExhibits] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editedExhibit, setEditedExhibit] = useState({
    Description: "",
    Collections: "",
    Location: "",
    Director_ID: "",
    image_url: "",
    explanation: "",
  });
  const [newExhibit, setNewExhibit] = useState({
    Description: "",
    Collections: "",
    Location: "",
    Director_ID: "",
    image_url: "",
    explanation: "",
  });
  const [selectedExhibitForDeletion, setSelectedExhibitForDeletion] =
    useState(null);
  const [selectedExhibit, setSelectedExhibit] = useState(null);

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedExhibit({ ...editedExhibit, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updatedExhibits = exhibits.map((exhibits) =>
      exhibits.Exhibit_id === editedExhibit.id
        ? { ...exhibits, ...editedExhibit }
        : exhibits
    );
    setExhibits(updatedExhibits);
    setSelectedExhibit(null);
    setShowEditForm(false);
  };

  const [showActive, setShowActive] = useState(true);

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    setNewExhibit({
      Description: "",
      Collections: "",
      Location: "",
      Director_ID: "",
      image_url: "",
      explanation: "",
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
      Description: newExhibit.Description,
      Collections: "test collection",
      Location: newExhibit.Location,
      Director_ID: Number(newExhibit.Director_ID),
      image_url: newExhibit.image_url,
      explanation: newExhibit.explanation,
    };

    console.log("Sending data:", newEmp);

    try {
      const response = await fetch("http://localhost:8081/manage-exhibits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmp),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorMessage = await response.text(); // Get error message from response
        throw new Error(
          `Server responded with ${response.status}: ${errorMessage}`
        );
      }

      const responseData = await response.json();
      console.log("Response data:", responseData);

      // Fetch the updated list of exhibits
      const updatedResponse = await fetch(
        "https://museuma.onrender.com/manage-exhibits"
      );
      if (!updatedResponse.ok) {
        throw new Error("Failed to fetch updated exhibits");
      }
      const updatedData = await updatedResponse.json();
      setExhibits(updatedData);

      toggleAddForm();
    } catch (error) {
      console.error("Error adding exhibit:", error.message);
      // Handle error as needed
    }
  };

  const deleteExhibit = (exhibitID) => {
    setSelectedExhibitForDeletion(exhibitID);
  };

  const confirmDelete = async () => {
    console.log("button is hit");
    try {
      // Send PUT request to mark exhibit for deletion
      const response = await fetch("http://localhost:8081/manage-exhibits", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "markForDeletion",
          Exhibit_id: selectedExhibitForDeletion,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to mark exhibit for deletion");
      }

      // Confirm deletion and update state
      const updatedExhibits = exhibits.filter(
        (exhibit) => exhibit.exhibit_id !== selectedExhibitForDeletion
      );
      setExhibits(updatedExhibits);
      setSelectedExhibitForDeletion(null);
    } catch (error) {
      console.error("Error marking exhibit for deletion:", error);
      // Handle error as needed
    }
  };

  const Reactivation = async () => {
    console.log("button is hit");
    try {
      // Send PUT request to mark exhibit for deletion
      const response = await fetch("http://localhost:8081/manage-exhibits", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "markForReactivation",
          Exhibit_id: selectedExhibitForDeletion,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to mark exhibit for deletion");
      }

      // Confirm deletion and update state
      const updatedExhibits = exhibits.filter(
        (exhibit) => exhibit.exhibit_id !== selectedExhibitForDeletion
      );
      setExhibits(updatedExhibits);
      setSelectedExhibitForDeletion(null);

    } catch (error) {
      console.error("Error marking exhibit for deletion:", error);
      // Handle error as needed
    }
  };

  const editExhibit = (exhibit) => {
    setSelectedExhibit(exhibit);
    setShowEditForm(true);
    setEditedExhibit({
      Exhibit_id: exhibit.Exhibit_id,
      Description: exhibit.Description,
      Collections: exhibit.Collections,
      Location: exhibit.Location,
      Director_ID: exhibit.Director_ID,
      image_url: exhibit.image_url,
      explanation: exhibit.explanation,
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

<div className="flex flex-col items-start">
        <button
          onClick={toggleAddForm}
          className="text-3xl mb-2 hover:text-[#C0BAA4]"
        >
          {showAddForm ? "Cancel" : "Add Exhibit"}
        </button>

        {showActive ? (
  <button className="mb-4 text-2xl" onClick={() => setShowActive(false)}>Show Inactive</button>
) : (
  <button className="mb-4 text-2xl" onClick={() => setShowActive(true)}>Show Active</button>
)}
</div>
      <ul className="divide-y divide-gray-300 mb-6">
      {exhibits.filter(exhibit => exhibit.active === (showActive ? 1 : 0)).map((exhibit) => (
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
      {exhibit.active ? (
        <button onClick={() => deleteExhibit(exhibit.Exhibit_id)}>
          <FaTrash className="hover:text-[#C0BAA4] text-2xl" />
        </button>
      ) : (
        <button onClick={() => Reactivation(exhibit.Exhibit_id)}>
          <FaRecycle className="hover:text-[#C0BAA4] text-2xl" /> {/* Replace with your reactivation icon */}
        </button>
      )}
    </div>
  </li>
))}
      </ul>

        {showAddForm && (
          <div className="flex">
            <div className="mb-6 flex">
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
              <input
                type="text"
                placeholder="Image URL"
                className="border rounded mr-2 p-2 flex-1"
                value={newExhibit.image_url}
                onChange={(e) =>
                  setNewExhibit({ ...newExhibit, image_url: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Explanation"
                className="border rounded mr-2 p-2 flex-1"
                value={newExhibit.explanation}
                onChange={(e) =>
                  setNewExhibit({ ...newExhibit, explanation: e.target.value })
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
                  <input
                    type="text"
                    id="Image URL"
                    name="image_url"
                    className="mt-1 p-2 border rounded-md w-full"
                    value={editedExhibit.image_url}
                    onChange={handleEditInputChange}
                  />
                </div>
                <input
                  type="text"
                  id="Explanation"
                  name="explanation"
                  className="mt-1 p-2 border rounded-md w-full"
                  value={editedExhibit.explanation}
                  onChange={handleEditInputChange}
                />
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
