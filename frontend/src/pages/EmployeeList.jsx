import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EmployeeTable from "../components/EmployeeTable";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("https://mern-employee-management-bep4.onrender.com/api/employee/getemp");
      const result = response.data;
      setEmployees(result);
      setFilteredEmployees(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleNavigate = () => {
    navigate("/createEmployee");
  };

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearch = () => {
    const lowerKeyword = keyword.toLowerCase();
    const filtered = employees.filter((emp) =>
      emp.f_Name?.toLowerCase().includes(lowerKeyword)
    );
    setFilteredEmployees(filtered);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      {/* Top bar with count and create button */}
      <div className="w-full p-2 flex justify-end">
        <div className="w-[30%] flex justify-between items-center">
          <p className="text-xl font-medium">{`Count : ${filteredEmployees.length}`}</p>
          <button
            className="border-2 p-2 bg-richblue-50 rounded-md"
            onClick={handleNavigate}
          >
            Create Employee
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="w-full p-2 flex justify-end bg-blue-5">
        <div className="w-[30%] flex gap-3 items-center">
          <p className="text-xl">Search</p>
          <input
            type="text"
            placeholder="Enter Search Keyword"
            value={keyword}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="p-2 rounded-md w-[70%]"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Search
          </button>
        </div>
      </div>

      {/* Employee table */}
      <EmployeeTable data={filteredEmployees} fetchEmployees={fetchEmployees} />
    </div>
  );
};

export default EmployeeList;
