import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "../App.css";
import "../index.css";

function ExhibitReport() {
  const [exhibitsData, setExhibitsData] = useState(null);
  const [filter, setFilter] = useState("totalSales");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchExhibitsData();
  }, []);

  const fetchExhibitsData = async () => {
    try {
      const response = await fetch("http://localhost:8081/exhibit-report");
      if (!response.ok) {
        throw new Error("Failed to fetch exhibit data");
      }
      const data = await response.json();
      setExhibitsData(data);
      console.log(exhibitsData);
    } catch (error) {
      console.error("Error fetching exhibit data:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  const filteredData = exhibitsData?.filter((exhibit) => {
    if (
      filter === "totalSales" &&
      exhibit?.Exhibit_Name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return true;
    return false;
  });

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
          Exhibits Report
        </h1>
        <div className="mb-4 flex justify-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for exhibits..."
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <table className="divide-y divide-gray-300 mb-6 w-full text-center mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 font-medium text-xl underline border">
                Exhibit Name
              </th>
              <th className="px-4 py-2 font-medium text-xl underline border">
                Tickets Bought
              </th>
              <th className="px-4 py-2 font-medium text-xl underline border">
                Amount Made
              </th>
              <th className="px-4 py-2 font-medium text-xl underline border">
                # Of Complaints
              </th>
              {/* <th className="px-4 py-2 font-medium text-xl underline border">
                Open Date
              </th>
              <th className="px-4 py-2 font-medium text-xl underline border">
                Close Date
              </th> */}
            </tr>
          </thead>
          <tbody>
            {filteredData &&
              filteredData.map((exhibit, index) => (
                <tr key={index} className="text-gray-700">
                  <td className="px-4 py-2 border">{exhibit.Exhibit_Name}</td>
                  <td className="px-4 py-2 border">{exhibit.Tickets_Bought}</td>
                  <td className="px-4 py-2 border">${exhibit.Amount_Made}</td>
                  <td className="px-4 py-2 border">
                    {exhibit.Complaints_Received}
                  </td>
                  {/* <td className="px-4 py-2 border">{exhibit.open_date}</td>
                  <td className="px-4 py-2 border">{exhibit.close_date}</td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default ExhibitReport;
