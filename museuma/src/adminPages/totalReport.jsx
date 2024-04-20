import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "../App.css";
import "../index.css";

function TotalReport() {
  const [salesData, setSalesData] = useState(null);
  const [filter, setFilter] = useState("totalSales");
  const [searchTerm, setSearchTerm] = useState("");

  const [sortField, setSortField] = useState(null);
const [sortDirection, setSortDirection] = useState('asc');

const handleHeaderClick = (field) => {
  setSortField(field);
  setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
};

const sortedData = React.useMemo(() => {
  if (!sortField) return salesData;
  const sorted = [...salesData].sort((a, b) => {
    if (a[sortField] < b[sortField]) return -1;
    if (a[sortField] > b[sortField]) return 1;
    return 0;
  });
  return sortDirection === 'asc' ? sorted : sorted.reverse();
}, [salesData, sortField, sortDirection]);

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    try {
      const response = await fetch("https://museuma.onrender.com/total-report");
      if (!response.ok) {
        throw new Error("Failed to fetch sales data");
      }
      const data = await response.json();
      setSalesData(data);
      console.log(salesData);
    } catch (error) {
      console.error("Error fetching sales data:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  const filteredData = salesData?.filter((sale) => {
    if (
      filter === "totalSales" &&
      sale?.item_bought?.toLowerCase().includes(searchTerm.toLowerCase())
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
          Sales Report
        </h1>
        <div className="mb-4 flex justify-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for items..."
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <table className="divide-y divide-gray-300 mb-6 w-full text-center mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 font-medium text-xl underline border">
                Customer
              </th>
              <th className="px-4 py-2 font-medium text-xl underline border">
                Item Bought
              </th>
              <th className="px-4 py-2 font-medium text-xl underline border">
                Amount Spent
              </th>
              <th className="px-4 py-2 font-medium text-xl underline border">
                Quantity
              </th>
              <th className="px-4 py-2 font-medium text-xl underline border">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData &&
              filteredData.map((sale, index) => (
                <tr key={index} className="text-gray-700">
                  <td className="px-4 py-2 border">{sale.customer_name}</td>
                  <td className="px-4 py-2 border">{sale.item_bought}</td>
                  <td className="px-4 py-2 border">${sale.total_price}</td>
                  <td className="px-4 py-2 border">{sale.quantity_bought}</td>
                  <td className="px-4 py-2 border">{new Date(sale.order_date).toLocaleDateString('en-US')}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default TotalReport;