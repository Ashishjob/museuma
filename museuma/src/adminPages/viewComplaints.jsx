import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../App.css';
import '../index.css';

const ViewComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      const simulatedComplaintsData = [
        { id: 1, branch: "Modern Art", date: "2024-03-14", message: "The lighting in the Modern Art section was too dim." },
        { id: 2, branch: "Photography", date: "2024-02-20", message: "The Photography exhibit was excellent, but it was too crowded." },
        { id: 3, branch: "Renaissance", date: "2024-01-15", message: "The Renaissance section was too cold." },
        { id: 4, branch: "Ancient Art", date: "2023-03-19", message: "The Ancient Art section was excellent, but the restrooms nearby were not clean." },
        { id: 5, branch: "Cubism", date: "2023-12-20", message: "The Cubism exhibit was too small." },
        { id: 6, branch: "Modern Art", date: "2024-03-14", message: "The Modern Art section was too crowded." },
        { id: 7, branch: "Photography", date: "2024-02-21", message: "The Photography exhibit lacked a variety of works." },
        { id: 8, branch: "Renaissance", date: "2024-01-16", message: "The Renaissance paintings were not well preserved." },
        { id: 9, branch: "Ancient Art", date: "2023-03-20", message: "The Ancient Art section lacked information about the artifacts." },
        { id: 10, branch: "Cubism", date: "2023-12-21", message: "The Cubism exhibit lacked works from prominent artists." },
      ];
      setComplaints(simulatedComplaintsData);
    };

    fetchComplaints();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
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

  // Implement your search and filter logic here
  const filteredComplaints = complaints.filter((complaint) => {
    const complaintDate = new Date(complaint.date);
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    // Filter by branch name
    if (!complaint.branch.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Filter by date
    switch (dateFilter) {
      case "lastWeek":
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        if (complaintDate < oneWeekAgo) {
          return false;
        }
        break;
      case "lastMonth":
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        if (complaintDate < oneMonthAgo) {
          return false;
        }
        break;
      case "lastYear":
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        if (complaintDate < oneYearAgo) {
          return false;
        }
        break;
      case "between":
        if (complaintDate < startDateObj || complaintDate > endDateObj) {
          return false;
        }
        break;
      default:
        break;
    }

    return true;
  });

  return (
    <main className="min-h-screen bg-[#EFEDE5] w-screen flex justify-center">
      <div className="container mx-auto p-6">
        <Link to="/admin" className="absolute top-32 left-10 inline-block text-2xl text-[#313639] hover:text-[#C0BAA4]">
          <FaArrowLeft />
        </Link>
        <h1 className="text-4xl text-center mb-6 mt-24 text-[#313639]">View Complaints</h1>

        <div className="flex flex-col justify-between mb-6 ">
          <div className="flex flex-row w-1/3">
            <div className="mb-4 mr-2 w-full">
              <input
                type="text"
                placeholder="Search by branch"
                value={searchTerm}
                onChange={handleSearchChange}
                className="border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none w-full"
              />
            </div>

            <div className="mb-4 w-full">
              <select value={dateFilter} onChange={handleDateFilterChange} className="border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none w-full">
                <option value="all">All time</option>
                <option value="lastWeek">Last week</option>
                <option value="lastMonth">Last month</option>
                <option value="lastYear">Last year</option>
                <option value="between">Between dates</option>
              </select>
            </div>
          </div>

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {filteredComplaints.map((complaint) => (
              <div key={complaint.id} className="bg-white rounded-lg p-4 shadow-md">
                <h2 className="text-2xl mb-2">{`Branch: ${complaint.branch}`}</h2>
                <p className="text-xl mb-2">{`Date: ${complaint.date}`}</p>
                <p>{`Message: ${complaint.message}`}</p>
              </div>
            ))}
          </div>
        </div>
    </main>
  );
};

export default ViewComplaints;