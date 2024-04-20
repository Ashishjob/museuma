import React, { useEffect, useState } from "react";

function Dining() {
  
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch food items from backend
    const fetchFoodItems = async () => {
      try {
        const response = await fetch("https://museuma.onrender.com/manage-restaurant");
        const data = await response.json();
        setItems(data); // Assuming the response is an array of items
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };

    fetchFoodItems();
  }, []);

  return (
    <main className="min-h-screen w-screen p-4">
    <h1 className="text-4xl mb-4 bg-[#EFEDE5] rounded-xl pl-2">
        Dining
    </h1>
    <h1 className="text-3xl">
        Our Menu:
    </h1>
    <div className="grid grid-cols-3 gap-7 mb-48">
        {items.map((food, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-2">
            <img src={food.image} alt={food.name} className="w-full h-64 object-cover rounded" />
            <h2 className="text-xl mt-2">{food.name}</h2>
            <p className="text-lg">{food.description}</p>
            <p className="font-bold">${food.price}</p>
          </div>
        ))}
      </div>
</main>
  );
}

export default Dining;
