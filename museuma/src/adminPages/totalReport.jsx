import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../App.css';
import '../index.css';

function TotalReport() {
  const [salesData, setSalesData] = useState(null);
  const [filter, setFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    try {
        const response = await fetch("https://museuma.onrender.com/total-report");
        if (!response.ok) {
          throw new Error("Failed to fetch sales");
        }
        const data = await response.json();
        setSalesData(data);
      } catch (error) {
        console.error("Error fetching sales:", error);
      }
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const sortedData = salesData
    ? [...salesData].sort((a, b) => {
        if (sortColumn === 'customer') {
          return sortOrder === 'asc' ? a.customer.localeCompare(b.customer) : b.customer.localeCompare(a.customer);
        } else if (sortColumn === 'item') {
          return sortOrder === 'asc' ? a.item.localeCompare(b.item) : b.item.localeCompare(a.item);
        } else if (sortColumn === 'amount') {
          return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
        } else if (sortColumn === 'date') {
          return sortOrder === 'asc' ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date);
        }
        return 0;
      })
    : [];

  const filteredData = sortedData.filter((sale) => {
    if (
      (!startDate || new Date(sale.date) >= new Date(startDate)) &&
      (!endDate || new Date(sale.date) <= new Date(endDate))
    ) {
      if (filter === 'totalSales' && sale.item.toLowerCase().includes(searchTerm.toLowerCase())) return true;
      if (filter === 'giftShopSales' && !(sale.item === 'Ticket') && sale.item.toLowerCase().includes(searchTerm.toLowerCase())) return true;
      if (filter === 'ticketSales' && (sale.item === 'Ticket') && sale.item.toLowerCase().includes(searchTerm.toLowerCase())) return true;
    }
    return false;
  });

  return (
    <main className="min-h-screen bg-[#EFEDE5] w-screen flex justify-center">
      <div className="container mx-auto p-6">
        <Link to="/admin" className="absolute top-32 left-10 inline-block text-2xl text-[#313639] hover:text-[#C0BAA4]">
          <FaArrowLeft />
        </Link>
        <h1 className="text-4xl text-center mb-6 mt-24 text-[#313639]">Total Sales Report</h1>
        <div className="mb-4 flex justify-center space-x-4">
          <button onClick={() => setFilter('totalSales')} className="text-2xl mb-4 bg-[#313639] hover:bg-[#C0BAA4] text-white py-2 px-4 rounded">Total Sales</button>
          <button onClick={() => setFilter('giftShopSales')} className="text-2xl mb-4 bg-[#313639] hover:bg-[#C0BAA4] text-white py-2 px-4 rounded">Gift Shop Sales</button>
          <button onClick={() => setFilter('ticketSales')} className="text-2xl mb-4 bg-[#313639] hover:bg-[#C0BAA4] text-white py-2 px-4 rounded">Ticket Sales</button>
        </div>
        <div className="mb-4 flex justify-center">
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search for items..." className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4 flex justify-center">
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="Start Date" className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="End Date" className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        {filteredData && (
          <table className="divide-y divide-gray-300 mb-6 w-full text-center mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 font-medium text-xl underline border" onClick={() => handleSort('customer')}>Customer</th>
                <th className="px-4 py-2 font-medium text-xl underline border" onClick={() => handleSort('item')}>Item Bought</th>
                <th className="px-4 py-2 font-medium text-xl underline border" onClick={() => handleSort('amount')}>Amount Spent</th>
                <th className="px-4 py-2 font-medium text-xl underline border" onClick={() => handleSort('date')}>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((sale) => (
                <tr key={sale.id} className="text-gray-700">
                  <td className="px-4 py-2 border">{sale.customer}</td>
                  <td className="px-4 py-2 border">{sale.item}</td>
                  <td className="px-4 py-2 border">${sale.amount}</td>
                  <td className="px-4 py-2 border">{sale.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}

export default TotalReport;