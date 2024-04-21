import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Select from "react-select";
import "../App.css";
import "../index.css";

const ManageGiftshop = () => {
  const [items, setItems] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editedItem, setEditedItem] = useState({
    title: "",
    price: "",
    description: "",
    quantity: "",
    image: "",
  });
  const [newItem, setNewItem] = useState({
    title: "",
    price: "",
    description: "",
    quantity: "",
    image: "",
  });
  const [selectedItemForDeletion, setSelectedItemForDeletion] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          "https://museuma.onrender.com/manage-giftshop"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
        // Handle error as needed
      }
    };

    fetchItems();
  }, []);

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting new item:", newItem); // Log the newItem before sending
    addItem();
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prevEditedItem) => ({
      ...prevEditedItem,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const updatedItemData = {
      item_id: editedItem.id,
      title: editedItem.title,
      price: Number(editedItem.price),
      description: editedItem.description,
      quantity: Number(editedItem.quantity),
      image_url: editedItem.image,
    };

    try {
      const response = await fetch(
        `https://museuma.onrender.com/manage-giftshop`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "update",
            ...updatedItemData,
          }),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Server error: ${errorMessage}`);
      }

      // Fetch updated data after successful update
      const updatedResponse = await fetch(
        "https://museuma.onrender.com/manage-giftshop"
      );
      const updatedData = await updatedResponse.json();
      setItems(updatedData);

      setSelectedItem(null);
      setShowEditForm(false);

      console.log("Item updated successfully!");
    } catch (error) {
      console.error("Client error:", error.message);
      alert(`Error updating item: ${error.message}`);
    }
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    setNewItem({
      title: "",
      price: "",
      description: "",
      quantity: "",
      image: "",
    });
  };

  // ... rest of the code ...

  const addItem = async () => {
    const newItemData = {
      title: newItem.title,
      price: Number(newItem.price),
      description: newItem.description,
      quantity: Number(newItem.quantity),
      image_url: newItem.image,
    };

    console.log(newItemData);

    try {
      const response = await fetch(
        "https://museuma.onrender.com/manage-giftshop",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItemData),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Server error:", errorMessage);
        throw new Error(`Failed to add item: ${errorMessage}`);
      }

      const updatedResponse = await fetch(
        "https://museuma.onrender.com/manage-giftshop"
      );

      if (!updatedResponse.ok) {
        throw new Error("Failed to fetch updated items");
      }

      const updatedData = await updatedResponse.json();
      setItems(updatedData);
      toggleAddForm();
    } catch (error) {
      console.error("Client error:", error.message);
      alert(`Error adding item: ${error.message}`);
    }
  };

  const deleteItem = (itemID) => {
    setSelectedItemForDeletion(itemID);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `https://museuma.onrender.com/manage-giftshop`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "markForDeletion",
            item_id: selectedItemForDeletion,
          }),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Server error: ${errorMessage}`);
      }

      const updatedItems = items.filter(
        (item) => item.item_id !== selectedItemForDeletion
      );
      setItems(updatedItems);
      setSelectedItemForDeletion(null);

      console.log("Item deleted successfully!");
    } catch (error) {
      console.error("Client error:", error.message);
      alert(`Error deleting item: ${error.message}`);
    }
  };

  const editItem = (item) => {
    setSelectedItem(item);
    setShowEditForm(true);
    setEditedItem({
      id: item.item_id, //FIX IN EMPLOYEES, REFER TO HANDLEEDIT SUBMIT
      title: item.title,
      price: item.price,
      description: item.description,
      quantity: item.quantity,
      image: item.image,
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
          Manage Gift Shop
        </h1>

        <button
          onClick={toggleAddForm}
          className="text-3xl mb-4 hover:text-[#C0BAA4]"
        >
          {showAddForm ? "Cancel" : "Add Item"}
        </button>
        {showAddForm && (
          <form onSubmit={handleAddSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Item name"
              value={newItem.title}
              onChange={handleAddInputChange}
              className="p-2 border-2 border-[#C0BAA4] rounded-lg mb-4 w-full"
            />
            <input
              type="text"
              name="description"
              placeholder="Item description"
              value={newItem.description}
              onChange={handleAddInputChange}
              className="p-2 border-2 border-[#C0BAA4] rounded-lg mb-4 w-full"
            />
            <input
              type="text"
              name="image"
              placeholder="Item image URL"
              value={newItem.image}
              onChange={handleAddInputChange}
              className="p-2 border-2 border-[#C0BAA4] rounded-lg mb-4 w-full"
            />
            <input
              type="number"
              name="price"
              placeholder="Item price"
              value={newItem.price}
              onChange={handleAddInputChange}
              className="p-2 border-2 border-[#C0BAA4] rounded-lg mb-4 w-full"
            />
            <input
              type="number"
              name="quantity"
              placeholder="Item quantity"
              value={newItem.quantity}
              onChange={handleAddInputChange}
              className="p-2 border-2 border-[#C0BAA4] rounded-lg mb-4 w-full"
            />
            <button
              type="submit"
              className="p-2 bg-[#313639] hover:bg-[#C0BAA4] rounded-lg text-white"
            >
              Submit
            </button>
          </form>
        )}

        <ul className="divide-y divide-gray-300 mb-6">
          {items.map((item, index) => (
            <li key={index} className="py-4 flex">
              <div className="flex flex-col">
                <span className="text-2xl">Item Name: {item.title}</span>
                <span className="text-xl">Description: {item.description}</span>
                <span className="text-xl">Price: ${item.price}</span>
                <span className="text-xl">Quantity: {item.quantity}</span>
              </div>
              <div className="ml-auto flex">
                <button onClick={() => editItem(item)} className="mr-2">
                  <FaEdit className="hover:text-[#C0BAA4] text-2xl" />
                </button>
                <button onClick={() => deleteItem(item.item_id)}>
                  <FaTrash className="hover:text-[#C0BAA4] text-2xl" />
                </button>
              </div>
            </li>
          ))}
        </ul>

        {selectedItemForDeletion && (
          <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-md">
              <p className="mb-4">Are you sure you want to delete this item?</p>
              <div className="flex justify-between">
                <button
                  onClick={() => setSelectedItemForDeletion(null)}
                  className="admin-button mr-2"
                >
                  Cancel
                </button>
                <button onClick={confirmDelete} className="admin-button">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {showEditForm && selectedItem && (
          <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-md">
              <h2 className="text-2xl mb-4">Edit Item</h2>
              <form onSubmit={handleEditSubmit}>
                <input
                  type="text"
                  name="title"
                  placeholder="Item name"
                  value={editedItem.title}
                  onChange={handleEditInputChange}
                  className="p-2 border-2 border-[#C0BAA4] rounded-lg mb-4 w-full"
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Item description"
                  value={editedItem.description}
                  onChange={handleEditInputChange}
                  className="p-2 border-2 border-[#C0BAA4] rounded-lg mb-4 w-full"
                />
                <input
                  type="text"
                  name="image"
                  placeholder="Item image URL"
                  value={editedItem.image}
                  onChange={handleEditInputChange}
                  className="p-2 border-2 border-[#C0BAA4] rounded-lg mb-4 w-full"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Item price"
                  value={editedItem.price}
                  onChange={handleEditInputChange}
                  className="p-2 border-2 border-[#C0BAA4] rounded-lg mb-4 w-full"
                />
                <input
                  type="number"
                  name="quantity"
                  placeholder="Item quantity"
                  value={editedItem.quantity}
                  onChange={handleEditInputChange}
                  className="p-2 border-2 border-[#C0BAA4] rounded-lg mb-4 w-full"
                />
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setShowEditForm(false)}
                    className="admin-button mr-2"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="admin-button">
                    Update
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

export default ManageGiftshop;
