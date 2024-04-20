import { backIn } from "framer-motion";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";


function Complaints() {
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [description, setDescription] = useState("");
  const [exhibits, setExhibits] = useState([]);
  const [customerId, setCustomerId] = useState(null); // State for customer_id
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setIsLoggedIn(true);
      decodeToken(storedToken).then((data) => {
        if (data) {
          const { user_id } = data;
          console.log("Customer ID:", user_id);
          setCustomerId(user_id); // Set customer_id state
        }
      });
    }
  }, []);

  const decodeToken = async (token) => {
    try {
      const response = await fetch("http://localhost:8081/decodeToken", {
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

  const handleSubmit = async () => {
    try {
      const customer_id = customerId;
      console.log(JSON.stringify({ name, branch, description }));
      const response = await fetch("http://localhost:8081/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, branch, customer_id, description }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit complaint");
      }

      setName("");
      setBranch("");
      setDescription("");

      alert("Complaint submitted successfully!");
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Failed to submit complaint. Please try again later.");
    }
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

  return (
    <main className="min-h-screen bg-white w-screen" style={{backgroundImage: `url(https://external-preview.redd.it/what-ever-came-of-the-complaints-against-pam-myers-of-the-v0-3tTuQwJsd5iwaG8Oca1eqBSGCTwa0YhgmVpxyUHa8AY.jpg?auto=webp&s=f8ee50b9873b918ae89b22c867ebfe42ccfae59a`}}>


      <h3 className="text-[#313639] text-4xl flex flex-col pl-2 m-4 py-2 w-full bg-[#bfbaa3] rounded-xl">
        Complaints
      </h3>
      <div className="flex flex-row w-full justify-center mt-24">
      <div className="bg-white w-1/2 h-fit mr-36 rounded-md shadow-2xl px-12 py-12 items-center justify-center">
        <p className="text-[#313639] text-2xl">
          Had a problem in the Baker Museum? Let us know:
        </p>
        <div className=" text-xl mt-5">
          <select className="w-full rounded-xl pl-2 border-[#bfbaa3] border-2">
            <option value="" disabled selected>Branch</option>
            {exhibits && exhibits.map((exhibit) => (
              <option key={exhibit.Exhibit_id} value={exhibit.Description}>
                {exhibit.Description}
              </option>
            ))}
          </select>
        </div>
        <label className="block text-xl mt-5" for="description">
          Description:{" "}
        </label>
        <textarea
          type="text"
          id="description"
          name="Description"
          maxLength="200"
          rows={5}
          cols={50}
          className="flex mt-1 rounded-xl w-full border-[#bfbaa3] border-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <a href="/complaint-confirmed">
        <button
          className="p-2 mt-5 text-xl rounded-3xl border border-[#313639] w-full hover:bg-gray-700 hover:text-white"
          type="submit"
          onClick={handleSubmit}
        >
          Submit Complaint
        </button>
        </a>
      </div>
      </div>
    </main>
  );
}

export default Complaints;
