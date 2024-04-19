import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../App.css';
import '../index.css';


function ExhibitReport() {
  const [exhibitsData, setExhibitsData] = useState(null);
  const [filter, setFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');


  useEffect(() => {
    fetchExhibitsData();
  }, []);


  const fetchExhibitsData = async () => {
    const data = [
      { id: 1, name: 'Modern Art: A Retrospective', tickets: 60, sales: 100, complaints: 2, active: 0 },
      { id: 2, name: 'Ancient Civilizations Unveiled', tickets: 46, sales: 50, complaints: 1, active: 1 },
    ];
    setExhibitsData(data);
  };


  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };


  const filteredData = exhibitsData?.filter((exhibit) => {
    if (filter === 'all' && exhibit.name.toLowerCase().includes(searchTerm.toLowerCase())) return true;
    if (filter === 'activeOnly' && exhibit.active === 1 && exhibit.name.toLowerCase().includes(searchTerm.toLowerCase())) return true;
    return false;
  });


  const sortedData = filteredData?.sort((a, b) => {
    if (sortColumn) {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return bValue < aValue ? -1 : bValue > aValue ? 1 : 0;
      }
    } else {
      return 0;
    }
  });


  return (
    <main className="min-h-screen bg-[#EFEDE5] w-screen flex justify-center">
      <div className="container mx-auto p-6">
        <Link to="/admin" className="absolute top-32 left-10 inline-block text-2xl text-[#313639] hover:text-[#C0BAA4]">
          <FaArrowLeft />
        </Link>
        <h1 className="text-4xl text-center mb-6 mt-24 text-[#313639]">Exhibits Report</h1>
        <div className="mb-4 flex justify-center space-x-4">
          <button onClick={() => setFilter('all')} className="text-2xl mb-4 bg-[#313639] hover:bg-[#C0BAA4] text-white py-2 px-4 rounded">All Exhibits</button>
          <button onClick={() => setFilter('activeOnly')} className="text-2xl mb-4 bg-[#313639] hover:bg-[#C0BAA4] text-white py-2 px-4 rounded">Active Only</button>
        </div>
        <div className="mb-4 flex justify-center">
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search for exhibits..." className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        {sortedData && (
          <table className="divide-y divide-gray-300 mb-6 w-full text-center mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 font-medium text-xl underline border" onClick={() => handleSort('name')}>Exhibit Name</th>
                <th className="px-4 py-2 font-medium text-xl underline border" onClick={() => handleSort('tickets')}>Tickets Bought</th>
                <th className="px-4 py-2 font-medium text-xl underline border" onClick={() => handleSort('sales')}>Amount Made</th>
                <th className="px-4 py-2 font-medium text-xl underline border" onClick={() => handleSort('complaints')}># Of Complaints</th>
                <th className="px-4 py-2 font-medium text-xl underline border" onClick={() => handleSort('active')}>Currently Active</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((exhibit) => (
                <tr key={exhibit.id} className="text-gray-700">
                  <td className="px-4 py-2 border">{exhibit.name}</td>
                  <td className="px-4 py-2 border">{exhibit.tickets}</td>
                  <td className="px-4 py-2 border">${exhibit.sales}</td>
                  <td className="px-4 py-2 border">{exhibit.complaints}</td>
                  <td className="px-4 py-2 border">{exhibit.active === 1 ? 'Yes' : 'No'}</td>
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
