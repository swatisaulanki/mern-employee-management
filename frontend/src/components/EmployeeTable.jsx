import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeTable = ({ data, fetchEmployees }) => {
    const navigate = useNavigate();

    // Format date in readable way
    const dateFormat = (date) => {
        if (!date) return "-";
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    // Navigate to Edit page
    const handleEdit = (id) => {
        navigate(`/employeeEdit/${id}`);
    };

    // Delete employee from backend
    const deleteEmployee = async (f_Id) => {
        try {
            const res = await axios.delete(`https://mern-employee-management-bep4.onrender.com/api/employee/deletemp/${f_Id}`);
            if (res.data) {
                alert("Employee deleted successfully!");
                fetchEmployees(); // Refresh table
                navigate("/employeelist");
            } else {
                alert("Invalid Request");
            }
        } catch (error) {
            console.error(error);
            alert("Error deleting employee");
        }
    };

    // Ask before delete
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            deleteEmployee(id);
        }
    };

    return (
        <div className="container mx-auto">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            <th className="px-6 py-3 border-b">Unique ID</th>
                            <th className="px-6 py-3 border-b">Image</th>
                            <th className="px-6 py-3 border-b">Name</th>
                            <th className="px-6 py-3 border-b">Email</th>
                            <th className="px-6 py-3 border-b">Mobile No</th>
                            <th className="px-6 py-3 border-b">Designation</th>
                            <th className="px-6 py-3 border-b">Gender</th>
                            <th className="px-6 py-3 border-b">Course</th>
                            <th className="px-6 py-3 border-b">Create Date</th>
                            <th className="px-6 py-3 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {data && data.length > 0 ? (
                            data.map((row) => (
                                <tr key={row.f_Id} className="border-t">
                                    <td className="px-4 py-4 border-b">{row.f_Id}</td>
                                    <td className="px-4 py-4 border-b">
                                        <img
                                            src={row.f_Image || "https://via.placeholder.com/48?text=No+Img"}
                                            alt={row.f_Name || "Profile"}
                                            className="w-12 h-12 rounded-full object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://via.placeholder.com/48?text=No+Img";
                                            }}
                                        />
                                    </td>
                                    <td className="px-4 py-4 border-b">{row.f_Name}</td>
                                    <td className="px-4 py-4 border-b">{row.f_Email}</td>
                                    <td className="px-4 py-4 border-b">{row.f_Mobile}</td>
                                    <td className="px-4 py-4 border-b">{row.f_Designation}</td>
                                    <td className="px-4 py-4 border-b">{row.f_Gender}</td>
                                    <td className="px-4 py-4 border-b">{row.f_Course}</td>
                                    <td className="px-4 py-4 border-b">{dateFormat(row.f_Createdate)}</td>
                                    <td className="px-4 py-4 border-b">
                                        <button
                                            onClick={() => handleEdit(row.f_Id)}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(row.f_Id)}
                                            className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10" className="text-center py-4">
                                    No employees found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeTable;
