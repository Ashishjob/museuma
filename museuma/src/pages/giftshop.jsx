import React, { useState, useEffect } from "react";

function Giftshop() {
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("asc");
  const [sort, setSort] = useState("title");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:8081/giftshop");
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

  const filteredProducts = items
    .filter((items) =>
      items.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "title") {
        return order === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (sort === "price") {
        return order === "asc" ? a.price - b.price : b.price - a.price;
      }
    });

  const [showPopup, setShowPopup] = useState(false);

  const addToCart = (product, quantity) => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = cartItems.findIndex(
      (item) => item.item_id === product.item_id
    );

    if (existingItemIndex !== -1) {
      // If the item already exists in the cart, update its quantity
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      // If the item does not exist in the cart, add it with the selected quantity
      cartItems.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
  };


  return (
    <main className="min-h-screen w-screen">
      <div className="p-4">
        <h1 className="text-4xl mb-4 bg-[#EFEDE5] rounded-xl pl-2">
          Gift Shop
        </h1>
        <div className="mb-4 flex w-full">
          <input
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-200 rounded p-2 mr-2 flex-grow"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-200 rounded p-2 w-1/6"
          >
            <option value="title">Sort by Title</option>
            <option value="price">Sort by Price</option>
          </select>
        </div>
        <div className="grid grid-cols-4 gap-7">
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-2 w-full"
            >
              <img
                src={product.image_url}
                alt={product.title}
                className="mx-auto w-fit h-64 rounded"
              />
              <h2 className="text-xl mt-2">{product.title}</h2>
              <p className="text-gray-500">{product.description}</p>
              <p className="">{product.quantity} in Stock</p>
              <div className="flex justify-between items-center mt-2">
                <p className="font-bold">${product.price}</p>
                <div className="flex items-center">
                  {/* <input type="number" min="1" max={product.item_stock} defaultValue="1" className="border border-gray-300 rounded-md px-2 py-1 mr-2 w-16" /> */}
                  <input
                    id={`quantity-${product.item_id}`}
                    type="number"
                    min="1"
                    max={product.item_stock}
                    defaultValue="1"
                    className="border border-gray-300 rounded-md px-2 py-1 mr-2 w-16"
                  />
                  <button
                    className="px-4 py-2 rounded text-black"
                    style={{
                      backgroundColor: "#BBB5A4",
                      transition: "background-color 0.3s, color 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#7D7869")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#BBB5A4")
                    }
                    onClick={() =>
                      addToCart(
                        product,
                        parseInt(
                          document.getElementById(`quantity-${product.item_id}`)
                            .value
                        )
                      )
                    }
                  >
                    Add to Cart
                  </button>
                  {showPopup && (
                    <div style={{
                      position: 'fixed',
                      bottom: '20px',
                      right: '20px',
                      padding: '20px',
                      backgroundColor: '#BBB5A4',
                      borderRadius: '10px',
                      opacity: showPopup ? 1 : 0,
                      transition: 'opacity 0.5s',
                      display: 'flex',
                    }}>
                      <span role="img" aria-label="checkmark">✔️</span>
                      <p className="ml-4">Added to cart!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Giftshop;
