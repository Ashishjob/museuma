import React, { useState } from "react";

function Complaints() {
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    try {
      console.log(JSON.stringify({ name, branch, description }));
      const response = await fetch("http://localhost:8081/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, branch, description }),
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

  return (
    <main className="min-h-screen bg-[#EFEDE5] w-screen">
      <h3 className="text-[#313639] text-7xl mb-2 ml-12 tracking-widest flex flex-col items-center">
        Complaints?
      </h3>
      <p className="text-[#313639] text-3xl mt-36 ml-12 tracking-wider">
        Had a problem in the Baker Museum? <br></br>Let us know!
      </p>

      <p className="text-[#313639] text-xl ml-12 mt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum illum nam
        quibusdam <br></br> sit amet consectetur adipisicing elit. Obcaecati
        magnam sint necessitatibus commodi corrupti<br></br>voluptatum in,
        exercitationem fugit adipisci id? dolor sit amet consectetur, <br></br>
        adipisicing elit. Cumque aperiam nesciunt praesentium at veritatis
        repellat nobis accusamus <br></br>blanditiis ipsam! Excepturi libero
        laudantium, enim provident dolore laboriosam amet repudiandae<br></br>{" "}
        esse. Mollitia velit culpa temporibus? Enim, esse maxime quisquam optio
        eius illo ab magni deleniti<br></br>eveniet sit iusto, sunt molestiae
        tenetur consectetur.
      </p>

      <div className="flex justify-end w-full top-60 -mt-80">
        <div className="bg-[#bfbaa3] w-1/3 h-96 mr-36 rounded-md shadow-2xl">
          <div className=" text-2xl ml-12 mt-5">
            <label for="name">Name: </label>
            <input
              type="text"
              id="name"
              name="Name"
              maxLength="25"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            ></input>
          </div>
          <div className=" text-2xl ml-12 mt-5">
            <label for="branch">Branch: </label>
            <select
              name="branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              required
            >
              <option value="">Select Branch</option>
              <option value="Surrealism">Surrealism</option>
              <option value="Modern Art">Modern Art</option>
            </select>
          </div>
          <label className="block text-2xl ml-12 mt-5" for="description">
            Description:{" "}
          </label>
          <textarea
            type="text"
            id="description"
            name="Description"
            maxLength="200"
            rows={5}
            cols={50}
            className="flex mt-1 ml-24"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button
            className="p-2 ml-80 mt-5 text-xl rounded-3xl border border-[#313639] border-4 hover:bg-gray-700 hover:text-white"
            type="submit"
            onClick={handleSubmit}
          >
            Submit Complaint
          </button>
        </div>
      </div>
    </main>
  );
}

export default Complaints;
