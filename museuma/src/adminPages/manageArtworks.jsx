import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../App.css";
import "../index.css";

const ManageArtwork = () => {
  const [artworks, setArtWork] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedArtWork, setSelectedArtWork] = useState(null);

  const [selectedArtworkForDeletion, setSelectedArtworkForDeletion] =
    useState(null);
  const [newArtwork, setNewArtwork] = useState({
    title: "",
    artist: "",
    creationDate: "",
    medium: "",
  });

  const [editedArtwork, setEditedArtwork] = useState({
    title: "",
    artist: "",
    creationDate: "",
    medium: "",
  });

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    //console.log("Submitting new item:", newArtwork); // Log the newItem before sending
    addArtwork();
  };

  const editArtWork = (artwork) => {
    setSelectedArtWork(artwork);
    setShowEditForm(true);
    setEditedArtwork({
      id: artwork.art_id,
      title: artwork.title,
      artist: artwork.artist,
      creationDate: artwork.creationDate,
      medium: artwork.medium,
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const addArtwork = async () => {
    const newArtworkData = {
      title: newArtwork.title,
      artist: newArtwork.artist,
      creationDate: formatDate(newArtwork.creationDate),
      medium: newArtwork.medium,
      image: newArtwork.image,
    };

    console.log(newArtworkData);

    try {
      const response = await fetch("http://localhost:8081/manage-artworks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newArtworkData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Server error:", errorMessage);
        throw new Error(`Failed to add artwork: ${errorMessage}`);
      }

      const updatedResponse = await fetch(
        "http://localhost:8081/manage-artworks"
      );

      if (!updatedResponse.ok) {
        throw new Error("Failed to fetch updated artworks");
      }

      const updatedData = await updatedResponse.json();
      setArtWork(updatedData);
      toggleAddForm();

      console.log("Artwork added successfully!");
    } catch (error) {
      console.error("Client error:", error.message);
      alert(`Error adding artwork: ${error.message}`);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const updatedArtworkData = {
      art_id: editedArtwork.id,
      title: editedArtwork.title,
      artist: editedArtwork.artist,
      image: editedArtwork.image,
      medium: editedArtwork.medium,
      creationDate: editedArtwork.creationDate,
    };

    try {
      const response = await fetch(`http://localhost:8081/manage-artworks`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "update",
          ...updatedArtworkData,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Server error: ${errorMessage}`);
      }

      // Fetch updated data after successful update (if needed)
      const updatedResponse = await fetch(
        "http://localhost:8081/manage-artworks"
      );
      const updatedData = await updatedResponse.json();
      setArtWork(updatedData);

      setSelectedArtWork(null);
      setShowEditForm(false);

      console.log("Artwork updated successfully!");
    } catch (error) {
      console.error("Client error:", error.message);
      alert(`Error updating artwork: ${error.message}`);
    }
  };

  const confirmDelete = () => {
    // Add your logic for confirming the deletion of an artwork here
    // For example, you can make a DELETE request to your backend to delete the artwork
    // After the artwork is deleted, you can fetch the updated list of artworks
  };

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch("http://localhost:8081/manage-artworks"); // Endpoint URL should match your backend route
        if (!response.ok) {
          throw new Error("Failed to fetch artworks");
        }
        const data = await response.json();
        setArtWork(data); // Assuming you have a state variable called 'state' to store the artworks
      } catch (error) {
        console.error("Error fetching artworks:", error);
        // Handle error as needed
      }
    };

    fetchArtworks();
  }, []);

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
          Manage Artworks
        </h1>

        <ul className="divide-y divide-gray-300 mb-6">
          {artworks.map((artwork, index) => (
            <li key={index} className="py-4 flex">
              <div className="flex flex-col">
                <span className="text-2xl">Title: {artwork.title}</span>
                <span className="text-xl">Artist: {artwork.artist}</span>
                <span className="text-xl">
                  Creation Date: {formatDate(artwork.creationDate)}
                </span>

                <span className="text-xl">Medium: {artwork.medium}</span>
              </div>
              <div className="ml-auto flex">
                <button onClick={() => editArtWork(artwork)} className="mr-2">
                  <FaEdit className="hover:text-[#C0BAA4] text-2xl" />
                </button>
                <button onClick={() => confirmDelete(artwork.id)}>
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
          Add Artwork
        </button>
        {showAddForm && (
          <div className="flex">
            <div className="mb-6 flex">
              <form onSubmit={handleAddSubmit}>
                <input
                  type="text"
                  name="title"
                  value={newArtwork.title}
                  placeholder="Title"
                  className="border rounded mr-2 p-2 flex-1"
                  onChange={(e) => {
                    setNewArtwork({ ...newArtwork, title: e.target.value });
                  }}
                />
                <input
                  type="text"
                  name="artist"
                  value={newArtwork.artist}
                  placeholder="Artist"
                  className="border rounded mr-2 p-2 flex-1"
                  onChange={(e) =>
                    setNewArtwork({ ...newArtwork, artist: e.target.value })
                  }
                />
                <input
                  type="date"
                  name="creationDate"
                  value={newArtwork.creationDate}
                  placeholder="Creation Date" // Adjusted placeholder
                  className="border rounded mr-2 p-2 flex-1"
                  onChange={
                    (e) =>
                      setNewArtwork({
                        ...newArtwork,
                        creationDate: e.target.value,
                      }) // Adjusted setter
                  }
                />
                <input
                  type="text"
                  name="medium"
                  value={newArtwork.medium}
                  placeholder="Medium"
                  className="border rounded mr-2 p-2 flex-1"
                  onChange={(e) =>
                    setNewArtwork({ ...newArtwork, medium: e.target.value })
                  }
                />
                <input
                  type="text"
                  name="image"
                  value={newArtwork.image}
                  placeholder="Image File"
                  className="border rounded mr-2 p-2 flex-1"
                  onChange={(e) =>
                    setNewArtwork({
                      ...newArtwork,
                      image: e.target.value,
                    })
                  }
                />
                <button
                  type="submit"
                  className="w-fit p-2 px-4 bg-[#313639] mb-6 text-white rounded-md hover:bg-[#5a5a5a]"
                >
                  Add Artwork
                </button>
              </form>
            </div>
          </div>
        )}

        {showEditForm && selectedArtWork && (
          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={editedArtwork.title}
              onChange={(e) =>
                setEditedArtwork({ ...editedArtwork, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Artist"
              value={editedArtwork.artist}
              onChange={(e) =>
                setEditedArtwork({ ...editedArtwork, artist: e.target.value })
              }
            />
            <input
              type="date"
              placeholder="Creation Date"
              value={editedArtwork.creationDate}
              onChange={(e) =>
                setEditedArtwork({
                  ...editedArtwork,
                  creationDate: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Medium"
              value={editedArtwork.medium}
              onChange={(e) =>
                setEditedArtwork({ ...editedArtwork, medium: e.target.value })
              }
            />
            <input
              type="file"
              placeholder="Image File"
              onChange={(e) =>
                setEditedArtwork({
                  ...editedArtwork,
                  image: e.target.files[0],
                })
              }
            />
            <button type="submit">Update Artwork</button>
          </form>
        )}

        {selectedArtworkForDeletion && (
          <div>
            <p>Are you sure you want to delete this artwork?</p>
            <button onClick={confirmDelete}>Yes</button>
            <button onClick={() => setSelectedArtworkForDeletion(null)}>
              No
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default ManageArtwork;
