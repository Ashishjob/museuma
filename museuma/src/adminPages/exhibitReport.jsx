import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import moment from "moment";
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
      const response = await fetch("https://museuma.onrender.com/exhibit-report");
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

  const [exhibitNameSearchTerm, setExhibitNameSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleExhibitNameSearchTermChange = (event) => {
    setExhibitNameSearchTerm(event.target.value);
  };

  const handleDateFilterChange = (event) => {
    setDateFilter(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const filteredData = exhibitsData?.filter((exhibit) => {
    const exhibitNameMatches = exhibit?.Exhibit_Name?.toLowerCase().includes(exhibitNameSearchTerm.toLowerCase());
    let dateMatches;
    switch (dateFilter) {
      case 'lastWeek':
        dateMatches = moment(exhibit?.date).isAfter(moment().subtract(1, 'weeks'));
        break;
      case 'lastMonth':
        dateMatches = moment(exhibit?.date).isAfter(moment().subtract(1, 'months'));
        break;
      case 'lastYear':
        dateMatches = moment(exhibit?.date).isAfter(moment().subtract(1, 'years'));
        break;
      case 'between':
        dateMatches = moment(new Date(exhibit?.date)).isBetween(moment(new Date(startDate)), moment(new Date(endDate)), undefined, '[]');
        break;
      default:
        dateMatches = true;
    }
    return exhibitNameMatches && dateMatches;
  });

  const totalTicketsBought = filteredData ? filteredData.reduce((total, exhibit) => total + exhibit.Tickets_Bought, 0) : 0;
  const totalAmountMade = filteredData ? filteredData.reduce((total, exhibit) => total + exhibit.Amount_Made, 0) : 0;
  const totalComplaintsReceived = filteredData ? filteredData.reduce((total, exhibit) => total + exhibit.Complaints_Received, 0) : 0;
  const numRowsShowing = filteredData ? filteredData.length : 0;

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
        <div className="mb-4 flex justify-center w-full">
          <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 w-full rounded-lg text-sm focus:outline-none"
            type="text" value={exhibitNameSearchTerm} onChange={handleExhibitNameSearchTermChange} placeholder="Search by exhibit name" />
          {dateFilter === "between" && (
            <div className="w-1/3 flex justify-between">
              <input
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                className="border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none w-1/2 mr-2"
              />
              <input
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                className="border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none w-1/2"
              />
            </div>
          )}
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
          <tfoot className="bg-gray-50">
            <tr>
              <td className="py-2 border">Total Count: {numRowsShowing}</td>
              <td className="py-2 border">Total Tickets Bought: {totalTicketsBought}</td>
              <td className="py-2 border">Total Amount Made: ${totalAmountMade.toFixed(2)}</td>
              <td className="py-2 border">Total Complaints Received: {totalComplaintsReceived}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </main>
  );
}

export default ExhibitReport;
