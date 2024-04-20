import React from "react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setItems(cartItems);
  }, []);
  useEffect(() => {
    calculateDiscountedTotal(items); // Recalculate discounted total when items change
  }, [items]);

  const calculateDiscountedTotal = (cartItems) => {
    const totalTickets = cartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    const discount = totalTickets >= 5 ? 0.15 : 0;
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const discountedTotal = total - total * discount;

    return discountedTotal; // Keep it as a number
  };

  const discountedTotal = calculateDiscountedTotal(items);

  const updateItemQuantity = async (item_id, quantity) => {
    try {
      const response = await fetch(
        "https://museuma.onrender.com/update-item-quantity",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ item_id, quantity }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update item quantity");
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error updating item quantity:", error);
      throw error;
    }
  };

  const decodeToken = async (token) => {
    try {
      const response = await fetch("https://museuma.onrender.com/decodeToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
      if (response.ok) {
        const decodedToken = await response.json();
        const { user_id, table_name } = decodedToken;

        // Log the values for verification
        console.log("User ID:", user_id);
        console.log("Table Name:", table_name);

        // Return user_id and table_name
        return { user_id, table_name };
      } else {
        console.error("Failed to decode token:", response.statusText);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }

    // If there's an error or response is not ok, return null or handle the error as needed
    return null;
  };

  const addOrder = async (orderData) => {
    try {
      const response = await fetch(
        "https://museuma.onrender.com/order-confirmed",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add order");
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error adding order:", error);
      throw error;
    }
  };

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleIncrease = (id) => {
    const updatedItems = items.map((item) =>
      item.item_id === id ? { ...item, quantity: item.quantity + 1 } : item
    );

    setItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const handleDecrease = (id) => {
    const updatedItems = items.map((item) =>
      item.item_id === id
        ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
        : item
    );

    setItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const handleRemove = (id) => {
    const updatedItems = items.filter((item) => item.item_id !== id);

    setItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    const storedToken = Cookies.get("token");
    if (!storedToken) {
      alert("You must be logged in to place an order.");
      return;
    }

    try {
      const decodedToken = await decodeToken(storedToken);
      if (!decodedToken || !decodedToken.user_id) {
        alert("Failed to decode token or user ID is missing.");
        return;
      }

      const { user_id } = decodedToken;

      // Get the current date
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear().toString().slice(2);
      const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed

      const cardHolder = document.querySelector(
        'input[placeholder="Card Holder"]'
      ).value;
      const cardNumber = document.querySelector(
        'input[placeholder="Card Number"]'
      ).value;
      const expirationDate = document.querySelector(
        'input[placeholder="Expiration Date (MM/YY)"]'
      ).value;
      const securityCode = document.querySelector(
        'input[placeholder="Security Code"]'
      ).value;
      const cardType = document.querySelector("select").value;

      const [inputMonth, inputYear] = expirationDate.split("/");

      if (
        inputYear < currentYear ||
        (inputYear === currentYear && inputMonth <= currentMonth)
      ) {
        alert("The expiration date must be greater than the current date.");
        return;
      }

      const orderDetails = {
        cardHolder,
        cardNumber,
        expirationDate,
        securityCode,
        cardType,
      };

      const cartDataString = localStorage.getItem("cart");
      const cartData = JSON.parse(cartDataString);

      // Inside handlePlaceOrder function
      for (const item of cartData) {
        const updatedQuantity = item.quantity;
        console.log(
          "Updating quantity for item:",
          item.item_id,
          "to",
          updatedQuantity
        );
        try {
          const updateResponse = await updateItemQuantity(
            item.item_id,
            updatedQuantity
          );
          console.log("Update response:", updateResponse);
          if (
            !updateResponse ||
            updateResponse.message !== "Item quantity updated successfully"
          ) {
            console.error("Failed to update item quantity:", updateResponse);
            alert("Failed to update item quantity.");
            return;
          }
        } catch (error) {
          console.error("Error updating item quantity:", error);
          alert(
            "An error occurred while updating item quantity. Please try again later."
          );
          return;
        }
      }

      // Rest of your code

      for (const item of cartData) {
        const orderData = {
          customer_id: user_id,
          item_id: item.item_id,
          quantity: item.quantity,
          total_price: item.price * item.quantity,
          order_date: currentDate.toISOString().slice(0, 10),
        };

        await addOrder(orderData); // Wait for each order to be added
      }

      localStorage.removeItem("cart");
      setItems([]);
      navigate("/thanks-for-order");
    } catch (error) {
      console.error("Error placing order:", error);
      alert(
        "An error occurred while placing the order. Please try again later."
      );
    }
  };

  const [email, setEmail] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [cardType, setCardType] = useState("");

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s/g, "");
    value = value.match(/.{1,4}/g)?.join(" ") || "";
    setCardNumber(value.slice(0, 19));
  };

  const handleExpirationDateChange = (e) => {
    let value = e.target.value.replace(/\//g, "");
    value = value.match(/.{1,2}/g)?.join("/") || "";
    value = value.slice(0, 5);
    setExpirationDate(value);
  };

  return (
    <main className="min-h-screen p-4 bg-[#EFEDE5]">
      <h1 className="text-4xl mb-4 text-center mt-24 rounded-xl pl-2">
        Checkout
      </h1>
      <div className="flex flex-row justify-center">
        <div className="flex-row bg-white w-fit justify-center items-center rounded-xl p-8">
          <div className="flex justify-center">
            <div className="flex justify-center gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h2 className="text-xl font-medium mb-2">Payment Details</h2>
                <p className="text-gray-400 mb-4">
                  Complete your order by providing your payment details.
                </p>
                <form className="space-y-4" onSubmit={handlePlaceOrder}>
                  {" "}
                  {/* Add onSubmit event handler */}
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    placeholder="Card Holder"
                    className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="Card Number"
                    className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
                  />
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      value={expirationDate}
                      onChange={handleExpirationDateChange}
                      placeholder="Expiration Date (MM/YY)"
                      pattern="(0[1-9]|1[0-2])\/\d{2}"
                      className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={securityCode}
                      onChange={(e) => setSecurityCode(e.target.value)}
                      placeholder="Security Code"
                      maxLength="3"
                      minLength={3}
                      className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
                    />{" "}
                  </div>
                  <select
                    value={cardType}
                    onChange={(e) => setCardType(e.target.value)}
                    className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select Card Type</option>
                    <option value="debit">Debit</option>
                    <option value="credit">Credit</option>
                  </select>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">Total</p>
                    <p className="text-2xl text-gray-900">
                      ${discountedTotal.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={
                      !email ||
                      !cardHolder ||
                      !cardNumber ||
                      !expirationDate ||
                      !securityCode ||
                      !cardType ||
                      items.length === 0
                    }
                    className={`w-full rounded-md px-6 py-3 font-medium text-white ${
                      !email ||
                      !cardHolder ||
                      !cardNumber ||
                      !expirationDate ||
                      !securityCode ||
                      !cardType
                        ? "bg-gray-900"
                        : "bg-gray-700"
                    }`}
                  >
                    Place Order
                  </button>
                </form>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 w-fit">
                <h2 className="text-xl font-medium mb-2">Order Summary</h2>
                <p className="text-gray-400 mb-4">
                  Check your items and select a shipping method.
                </p>
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div className="flex" key={index}>
                      <img
                        className="w-24 h-24 object-cover rounded-md mr-4"
                        src={item.image_url}
                        alt="Artwork"
                      />
                      <div className="flex flex-col">
                        <h3 className="text-lg">{item.title}</h3>
                        <p className="text-gray-600 mb-1">x {item.quantity}</p>
                        <p className="text-lg">${item.price.toFixed(2)}</p>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleIncrease(item.item_id)}
                            type="button"
                            className="flex rounded p-2 text-center text-black transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900 text-3xl"
                          >
                            +
                          </button>
                          <button
                            onClick={() => handleDecrease(item.item_id)}
                            type="button"
                            className="flex rounded p-2 text-center text-black transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900 text-3xl"
                          >
                            -
                          </button>
                          <button
                            onClick={() => handleRemove(item.item_id)}
                            type="button"
                            className="flex rounded p-2 text-center text-black transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900 text-sm items-center"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Checkout;
