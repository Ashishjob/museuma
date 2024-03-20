import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Select from 'react-select'; // Import react-select
import '../App.css';
import '../index.css';

const ManageExhibits = () => {
  const [exhibits, setExhibits] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editedExhibit, setEditedExhibit] = useState({
    id: "1",
    Name: "Exhibit 1",
    Description: "This is a description for Exhibit 1",
    ArtPieces: [
      { id: 1, name: "Art Piece 1" },
      { id: 2, name: "Art Piece 2" },
    ],
  });
  const [newExhibit, setNewExhibit] = useState({
    Name: "Exhibit 2",
    Description: "This is a description for Exhibit 2",
    ArtPieces: [
      { id: 3, name: "Art Piece 3" },
      { id: 4, name: "Art Piece 4" },
    ],
  });
  const [selectedExhibitForDeletion, setSelectedExhibitForDeletion] = useState(null);
  const [selectedExhibit, setSelectedExhibit] = useState(null);
  const [artPieces, setArtPieces] = useState([]); // New state variable for art pieces

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedExhibit({ ...editedExhibit, [name]: value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedExhibits = exhibits.map((exhibit) =>
      exhibit.id === editedExhibit.id ? { ...exhibit, ...editedExhibit } : exhibit
    );
    setExhibits(updatedExhibits);
    setSelectedExhibit(null);
    setShowEditForm(false);
  };

  useEffect(() => {
    const fetchArtPieces = async () => {
      // Replace this with actual fetch from your backend or data source
      const simulatedArtPiecesData = [
        { id: 1, name: "Art Piece 1" },
        { id: 2, name: "Art Piece 2" },
        { id: 3, name: "Art Piece 3" },
        { id: 4, name: "Art Piece 4" },
      ];
      setArtPieces(simulatedArtPiecesData);
    };

    fetchArtPieces();
  }, []);

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    setNewExhibit({
      Name: "",
      Director: "",
      ArtPieces: [], // Add ArtPieces property
    });
  };

  useEffect(() => {
    const fetchExhibits = async () => {
      const simulatedData = [];
      setExhibits(simulatedData);
    };

    fetchExhibits();
  }, []);

  const addExhibit = () => {
    const newExh = {
      Name: newExhibit.Name,
      Director: newExhibit.Director,
      ArtPieces: newExhibit.ArtPieces, // Add ArtPieces property
    };
    setExhibits([...exhibits, newExh]);
    toggleAddForm();
  };

  const deleteExhibit = (exhibit) => {
    setSelectedExhibitForDeletion(exhibit);
  };

  const confirmDelete = () => {
    const updatedExhibits = exhibits.filter((exhibit) => exhibit.id !== selectedExhibitForDeletion.id);
    setExhibits(updatedExhibits);
    setSelectedExhibitForDeletion(null);
  };

  const editExhibit = (exhibit) => {
    setSelectedExhibit(exhibit);
    setShowEditForm(true);
    setEditedExhibit({
      id: exhibit.id,
      Name: exhibit.Name,
      Director: exhibit.Director,
      ArtPieces: exhibit.ArtPieces, // Add ArtPieces property
    });
  };

  return (
    <main className="h-screen bg-[#EFEDE5] w-screen flex justify-center">
      <div className="container mx-auto p-6">
        <Link to="/admin" className="absolute top-32 left-10 inline-block text-2xl text-[#313639] hover:text-[#C0BAA4]">
          <FaArrowLeft />
        </Link>
        <h1 className="text-4xl text-center mb-6 mt-24 text-[#313639]">Exhibit Management</h1>

        <ul className="divide-y divide-gray-300 mb-6">
          {exhibits.map((exhibit) => (
            <li key={exhibit.id} className="py-4 flex">
              <div className="flex flex-col">
                <span className="text-2xl">{`${exhibit.Name}`}</span>
                <span className="text-xl">{exhibit.Director}</span>
                <span>Pieces: {exhibit.ArtPieces.map(artPiece => artPiece.name).join(', ')}</span>
              </div>
              <div className="ml-auto flex">
                <button
                  onClick={() => editExhibit(exhibit)}
                  className="mr-2"
                >
                  <FaEdit className="hover:text-[#C0BAA4] text-2xl" />
                </button>
                <button
                  onClick={() => deleteExhibit(exhibit)}
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
          {showAddForm ? "Cancel" : "Add Exhibit"}
        </button>

        {showAddForm && (
          <div className="flex">
            <div className="mb-6 flex">
              <input
                type="text"
                placeholder="Name"
                className="border rounded mr-2 p-2 flex-grow"
                value={newExhibit.Name}
                onChange={(e) => setNewExhibit({ ...newExhibit, Name: e.target.value })}
                style={{ width: '30%' }}
              />
              <input
                type="text"
                placeholder="Director"
                className="border rounded mr-2 p-2 flex-grow"
                value={newExhibit.Director}
                onChange={(e) => setNewExhibit({ ...newExhibit, Director: e.target.value })}
                style={{ width: '30%' }}
              />
              <Select
                isMulti
                options={artPieces.map(ap => ({ value: ap.id, label: ap.name }))}
                onChange={selectedOptions => setNewExhibit({
                  ...newExhibit,
                  ArtPieces: selectedOptions.map(option => artPieces.find(ap => ap.id === option.value)),
                })}
                className="flex-grow"
                style={{ width: '30%' }}
                placeholder="Select Art Pieces"
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
              onClick={addExhibit}
              className="w-fit p-2 px-4 ml-2 bg-[#313639] mb-6 text-white rounded-md hover:bg-[#5a5a5a]"
              style={{ width: '10%' }}
            >
              Submit
            </button>
          </div>
        )}

        {selectedExhibitForDeletion && (
          <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-md">
              <p className="mb-4">Are you sure you want to delete this exhibit?</p>
              <div className="flex justify-between">
                <button onClick={() => setSelectedExhibitForDeletion(null)} className="admin-button mr-2">Cancel</button>
                <button onClick={confirmDelete} className="admin-button bg-red-500 hover:bg-red-700">Delete</button>
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
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="Name"
                    className="mt-1 p-2 border rounded-md w-full"
                    value={editedExhibit.Name}
                    onChange={handleEditInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="Director" className="block text-sm font-medium text-gray-700">Director</label>
                  <input
                    type="text"
                    id="Director"
                    name="Director"
                    className="mt-1 p-2 border rounded-md w-full"
                    value={editedExhibit.Director}
                    onChange={handleEditInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="artPieces" className="block text-sm font-medium text-gray-700">Art Pieces</label>
                  <Select
                    id="artPieces"
                    name="ArtPieces"
                    isMulti
                    options={artPieces.map(ap => ({ value: ap.id, label: ap.name }))}
                    value={editedExhibit.ArtPieces.map(ap => ({ value: ap.id, label: ap.name }))}
                    onChange={selectedOptions => handleEditInputChange({
                      target: {
                        name: 'ArtPieces',
                        value: selectedOptions.map(option => artPieces.find(ap => ap.id === option.value)),
                      },
                    })}
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

export default ManageExhibits;