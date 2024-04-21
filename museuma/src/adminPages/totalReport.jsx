import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import moment from "moment";
import "../App.css";
import "../index.css";

function TotalReport() {
  const [salesData, setSalesData] = useState(null);
  const [filter, setFilter] = useState("totalSales");
  const [searchTerm, setSearchTerm] = useState("");

  // Add this state to keep track of the selected report type
  const [reportType, setReportType] = useState("totalSales");

  // Add this function to handle changes to the report type
  const handleReportTypeChange = (event) => {
    setReportType(event.target.value);
  };

  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const handleHeaderClick = (field) => {
    setSortField(field);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const sortedData = React.useMemo(() => {
    if (!sortField) return salesData;
    const sorted = [...salesData].sort((a, b) => {
      if (a[sortField] < b[sortField]) return -1;
      if (a[sortField] > b[sortField]) return 1;
      return 0;
    });
    return sortDirection === "asc" ? sorted : sorted.reverse();
  }, [salesData, sortField, sortDirection]);

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    let url;
    switch (reportType) {
      case "giftShop":
        url = "https://museuma.onrender.com/items-report";
        break;
      case "tickets":
        url = "https://museuma.onrender.com/tickets-report";
        break;
      default:
        console.log("yoyoyo");
        url = "https://museuma.onrender.com/total-report";
    }
    try {
      const response = await fetch(url);
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

  useEffect(() => {
    fetchSalesData();
  }, [reportType]);

  // Add these states to keep track of the search terms and date filter
  const [customerNameSearchTerm, setCustomerNameSearchTerm] = useState("");
  const [itemBoughtSearchTerm, setItemBoughtSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [currentFilters, setCurrentFilters] = useState({
    customerName: "",
    itemBought: "",
    dateFilter: "all",
  });

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  // Add these functions to handle changes to the search terms and date filter
  const handleCustomerNameSearchTermChange = (event) => {
    setCustomerNameSearchTerm(event.target.value);
  };
  const handleItemBoughtSearchTermChange = (event) => {
    setItemBoughtSearchTerm(event.target.value);
  };
  const handleDateFilterChange = (event) => {
    setDateFilter(event.target.value);
  };

  // Modify your filter function to filter by customer_name, item_bought, and date
  const filteredData = salesData?.filter((sale) => {
    const customerNameMatches = sale?.customer_name
      ?.toLowerCase()
      .includes(customerNameSearchTerm.toLowerCase());
    const itemBoughtMatches = sale?.item_bought
      ?.toLowerCase()
      .includes(itemBoughtSearchTerm.toLowerCase());
    let dateMatches;
    switch (dateFilter) {
      case "lastWeek":
        dateMatches = moment(sale?.date).isAfter(moment().subtract(1, "weeks"));
        break;
      case "lastMonth":
        dateMatches = moment(sale?.date).isAfter(moment().subtract(1, "months"));
        break;
      case "lastYear":
        dateMatches = moment(sale?.date).isAfter(moment().subtract(1, "years"));
        break;
      case "between":
        dateMatches = moment(new Date(sale?.order_date)).isBetween(
          moment(new Date(startDate)),
          moment(new Date(endDate)),
          undefined,
          "[]"
        );
        break;
      case "all":
        dateMatches = true; // Allow all dates
        break;
      default:
        dateMatches = true; // Default to true for other filters
    }
    return customerNameMatches && itemBoughtMatches && dateMatches;
  });
  

  const customerCounts = filteredData
    ? filteredData.reduce((counts, sale) => {
        counts[sale.customer_name] = (counts[sale.customer_name] || 0) + 1;
        return counts;
      }, {})
    : {};

  const mostActiveCustomer = Object.keys(customerCounts).reduce(
    (a, b) => (customerCounts[a] > customerCounts[b] ? a : b),
    "N/A"
  );

  const itemTotals = filteredData
    ? filteredData.reduce((totals, sale) => {
        totals[sale.item_bought] = (totals[sale.item_bought] || 0) + 1;
        return totals;
      }, {})
    : {};

  const mostPopularItem = Object.keys(itemTotals).reduce(
    (a, b) => (itemTotals[a] > itemTotals[b] ? a : b),
    "N/A"
  );

  const totalAmountSpent = filteredData
    ? filteredData.reduce((total, sale) => total + sale.total_price, 0)
    : 0;

  const totalQuantity = filteredData
    ? filteredData.reduce((total, sale) => total + sale.quantity_bought, 0)
    : 0;

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
          Sales Report
        </h1>

        <div className="mb-4 flex justify-center space-x-4">
          <select
            value={reportType}
            onChange={handleReportTypeChange}
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          >
            <option value="totalSales">Total Sales Report</option>
            <option value="giftShop">Gift Shop Sales Report</option>
            <option value="tickets">Ticket Sales Report</option>
          </select>
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="text"
            value={customerNameSearchTerm}
            onChange={handleCustomerNameSearchTermChange}
            placeholder="Search by customer name"
          />
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="text"
            value={itemBoughtSearchTerm}
            onChange={handleItemBoughtSearchTermChange}
            placeholder="Search by item bought"
          />
          <select
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            value={dateFilter}
            onChange={handleDateFilterChange}
          >
            <option value="all">All dates</option>
            <option value="lastWeek">Last week</option>
            <option value="lastMonth">Last month</option>
            <option value="lastYear">Last year</option>
            <option value="between">Between dates</option>
          </select>
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
                  <td className="px-4 py-2 border">
                    {new Date(sale.order_date).toISOString().split("T")[0]}
                  </td>
                </tr>
              ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td className="py-2 border">
                Most Active Customer: {mostActiveCustomer}
              </td>
              <td className="py-2 border">
                Most Popular Item: {mostPopularItem}
              </td>
              <td className="py-2 border">
                Total Earned: ${totalAmountSpent.toFixed(2)}
              </td>
              <td className="py-2 border">Total Quantity: {totalQuantity}</td>
              <td className="py-2 border">Total Count: {numRowsShowing}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </main>
  );
}

export default TotalReport;
