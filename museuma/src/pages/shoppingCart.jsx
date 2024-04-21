import React, { useState, useEffect } from "react";
import "../App.css";
import "../index.css";
import { useNavigate } from "react-router-dom";

function ShoppingCart() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [discountedTotal, setDiscountedTotal] = useState(0);
  const [discounted, setDiscount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchQuantity = async (item_id) => {
    try {
      const response = await fetch(
        `http://localhost:8081/getQuantity`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ item_id }),
        }
      );
      if (!response.ok) {
        throw new Error("Error fetching quantity");
      }
      const data = await response.json();
      return data.quantity;
    } catch (error) {
      console.error("Error fetching quantity:", error);
      return 0;
    }
  };

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setItems(cartItems);
    calculateDiscountedTotal(cartItems);
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
    setSubTotal(total);
    setDiscount(discount * total);
    const discountedTotal = total - total * discount;

    setDiscountedTotal(discountedTotal); // Keep it as a number
  };

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

  const handleCheckout = async () => {
    try {
      for (const item of items) {
        const fetchedQuantity = await fetchQuantity(item.item_id);
        console.log(`Item ${item.item_id}: Quantity in cart = ${item.quantity}, Fetched quantity = ${fetchedQuantity}`);
        if (item.quantity > fetchedQuantity) {
          setErrorMessage(`ERROR: Quantity for ${item.title} exceeds available quantity (${fetchedQuantity})`);
          return;
        }
      }
      navigate("/checkout");
      // Proceed with checkout logic here
    } catch (error) {
      console.error("Error during checkout:", error.message);
    }
  };


  return (
    <main className="min-h-screen bg-[#EFEDE5] w-screen pb-16">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <h1 className="text-4xl mb-4 text-center mt-24 rounded-xl pl-2">
            Your Cart
          </h1>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="flex-row bg-white justify-center items-center rounded-xl p-4 w-full">
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className="flow-root">
                <ul className="-my-8">
                  {items.map((item, index) => (
                    <li
                      key={index}
                      className="flex flex-col space-y-3 py-2 my-2 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                    >
                      <div className="shrink-0">
                        <img
                          className="h-24 w-24 max-w-full rounded-lg object-cover"
                          src={item.image_url}
                          alt="Product"
                        />
                      </div>

                      <div className="relative flex flex-1 flex-col justify-between">
                        <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                          <div className="pr-8 sm:pr-5">
                            <p className="text-base text-gray-900">
                              {item.title}
                            </p>
                            <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
                              {item.quantity}
                            </p>
                          </div>

                          <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                            <p className="shrink-0 w-20 text-base text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            <div className="sm:order-1">
                              <div className="mx-auto flex h-8 items-stretch text-gray-600">
                                <button
                                  onClick={() => handleDecrease(item.item_id)}
                                  className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                >
                                  -
                                </button>
                                <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                                  {item.quantity}
                                </div>
                                <button
                                  onClick={() => handleIncrease(item.item_id)}
                                  className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                          <button
                            onClick={() => handleRemove(item.item_id)}
                            type="button"
                            className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                          >
                            <svg
                              className="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                                className=""
                              />
                            </svg>
                          </button>

                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Subtotal</p>
                  <p className="text-lg text-gray-900">
                    ${subTotal.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="mt-10 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">
                    Discount (15% off for customers with 5 or more tickets!)
                  </p>
                  <p className="text-lg text-gray-900">
                    ${discounted.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-lg text-gray-900">
                  ${discountedTotal.toFixed(2)} {/* Convert to string here */}
                </p>
              </div>
              {errorMessage && (
                <p className="text-red-500 mt-4">{errorMessage}</p>
              )}
              <div className="mt-6 text-center">
                {/* <a href="/checkout"> */}
                <button
                  onClick={handleCheckout}
                  type="button"
                  className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                  disabled={items.length === 0}
                >
                  Checkout
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
                {/* </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ShoppingCart;

