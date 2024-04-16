import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../App.css';
import '../index.css';

function ExhibitReport() {
  const [salesData, setSalesData] = useState(null);
  const [filter, setFilter] = useState('totalSales');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    const data = [
      { id: 1, customer: 'John Doe', item: 'Ticket', amount: 100, quantity: 2, date: '2022-01-01', category: 'Ticket' },
      { id: 2, customer: 'Jane Doe', item: 'Gift', amount: 50, quantity: 1, date: '2022-01-02', category: 'Gift Shop' },
    ];
    setSalesData(data);
  };

  const filteredData = salesData?.filter((sale) => {
    if (filter === 'totalSales' && sale.item.toLowerCase().includes(searchTerm.toLowerCase())) return true;
    if (filter === 'giftShopSales' && sale.category === 'Gift Shop' && sale.item.toLowerCase().includes(searchTerm.toLowerCase())) return true;
    if (filter === 'ticketSales' && sale.category === 'Ticket' && sale.item.toLowerCase().includes(searchTerm.toLowerCase())) return true;
    return false;
  });

  return (
    <main className="min-h-screen bg-[#EFEDE5] w-screen flex justify-center">
      <div className="container mx-auto p-6">
        <Link to="/admin" className="absolute top-32 left-10 inline-block text-2xl text-[#313639] hover:text-[#C0BAA4]">
          <FaArrowLeft />
        </Link>
        <h1 className="text-4xl text-center mb-6 mt-24 text-[#313639]">Exhibits Report</h1>
        <div className="mb-4 flex justify-center">
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search for exhibits..." className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        {filteredData && (
          <table className="divide-y divide-gray-300 mb-6 w-full text-center mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 font-medium text-xl underline border">Exhibit Name</th>
                <th className="px-4 py-2 font-medium text-xl underline border">Tickets Bought</th>
                <th className="px-4 py-2 font-medium text-xl underline border">Amount Made</th>
                <th className="px-4 py-2 font-medium text-xl underline border"># Of Complaints</th>
                <th className="px-4 py-2 font-medium text-xl underline border">Open Date</th>
                <th className="px-4 py-2 font-medium text-xl underline border">Close Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((sale) => (
                <tr key={sale.id} className="text-gray-700">
                  <td className="px-4 py-2 border">{sale.customer}</td>
                  <td className="px-4 py-2 border">{sale.item}</td>
                  <td className="px-4 py-2 border">${sale.amount}</td>
                  <td className="px-4 py-2 border">{sale.quantity}</td>
                  <td className="px-4 py-2 border">{sale.date}</td>
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

export default ExhibitReport;