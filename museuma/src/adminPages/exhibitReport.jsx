import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../App.css';
import '../index.css';

function ExhibitReport() {
  const [exhibitsData, setExhibitsData] = useState(null);
  const [filter, setFilter] = useState('totalSales');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchExhibitsData();
  }, []);

  const fetchExhibitsData = async () => {
    const data = [
      { id: 1, name: 'Modern Art: A Retrospective', tickets: 60, sales: 100, complaints: 2, open_date: '2022-01-01', close_date: '2024-04-16' },
      { id: 2, name: 'Ancient Civilizations Unveiled', tickets: 46, sales: 50, complaints: 1, open_date: '2022-01-02'},
    ];
    setExhibitsData(data);
  };

  const filteredData = exhibitsData?.filter((exhibit) => {
    if (filter === 'totalSales' && exhibit.name.toLowerCase().includes(searchTerm.toLowerCase())) return true;
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
              {filteredData.map((exhibit) => (
                <tr key={exhibit.id} className="text-gray-700">
                  <td className="px-4 py-2 border">{exhibit.name}</td>
                  <td className="px-4 py-2 border">{exhibit.tickets}</td>
                  <td className="px-4 py-2 border">${exhibit.sales}</td>
                  <td className="px-4 py-2 border">{exhibit.complaints}</td>
                  <td className="px-4 py-2 border">{exhibit.open_date}</td>
                  <td className="px-4 py-2 border">{exhibit.close_date}</td>
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