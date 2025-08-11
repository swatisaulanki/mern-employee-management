import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EmployeeTable from "../components/EmployeeTable";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  // useCallback prevents unnecessary re-creations of the fetch function
  const fetchEmployees = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://mern-employee-management-bep4.onrender.com/api/employee/getemp"
      );
      console.log("Response data:", response.data);

      const result = response.data.data || [];
      setEmployees(result);
      setFilteredEmployees(result);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  }, []);

  // Auto-fetch on mount
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // Auto-update filtered list if search keyword changes
  useEffect(() => {
    if (!keyword.trim()) {
      setFilteredEmployees(employees);
    } else {
      const lowerKeyword = keyword.toLowerCase();
      setFilteredEmployees(
        employees.filter((emp) =>
          emp.f_Name?.toLowerCase().includes(lowerKeyword)
        )
      );
    }
  }, [keyword, employees]);

  const handleNavigate = () => {
    navigate("/createEmployee");
  };

  return (
    <div>
      {/* Top bar with count and create button */}
      <div className="w-full p-2 flex justify-end">
        <div className="w-[30%] flex justify-between items-center">
          <p className="text-xl font-medium">
            Count : {filteredEmployees.length}
          </p>
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
            onChange={(e) => setKeyword(e.target.value)}
            className="p-2 rounded-md w-[70%]"
          />
        </div>
      </div>

      {/* Employee table */}
      <EmployeeTable
        data={filteredEmployees}
        fetchEmployees={fetchEmployees} // will be called after delete/update
      />
    </div>
  );
};

export default EmployeeList;
