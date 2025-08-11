import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';

const Form = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        f_Id: uuidV4(),
        f_Image: "",
        f_Name: "",
        f_Email: "",
        f_Mobile: "",
        f_Designation: "",
        f_Gender: "",
        f_Course: []
    });

    const [previewImage, setPreviewImage] = useState("");

    // Handle text, radio, and select inputs
    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;

        if (type === "checkbox") {
            setFormValues((prev) => {
                let updatedCourses = [...prev.f_Course];
                if (checked) {
                    updatedCourses.push(value);
                } else {
                    updatedCourses = updatedCourses.filter((course) => course !== value);
                }
                return { ...prev, f_Course: updatedCourses };
            });
        } else {
            setFormValues({
                ...formValues,
                [name]: value
            });
        }
    };

    // Handle image file upload and preview
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormValues((prev) => ({ ...prev, f_Image: reader.result }));
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Create employee
    const createEmployee = async (data) => {
        try {
            const response = await axios.post("https://mern-employee-management-bep4.onrender.com/api/employee/createmp", data);
            if (response.data) {
                alert("Employee Created!");
                navigate("/employeelist");
            } else {
                alert("Invalid Request");
            }
        } catch (error) {
            console.error(error);
            alert("Error creating employee");
        }
    };

    // Submit form
    const handleFormSubmission = (e) => {
        e.preventDefault();
        createEmployee(formValues);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <form onSubmit={handleFormSubmission}>
                {/* Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="f_Name"
                        value={formValues.f_Name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="f_Email"
                        value={formValues.f_Email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                    />
                </div>

                {/* Mobile */}
                <div className="mb-4">
                    <label htmlFor="mobile" className="block text-gray-700">Mobile No:</label>
                    <input
                        type="tel"
                        id="mobile"
                        name="f_Mobile"
                        value={formValues.f_Mobile}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                    />
                </div>

                {/* Designation */}
                <div className="mb-4">
                    <label htmlFor="designation" className="block text-gray-700">Designation:</label>
                    <select
                        id="designation"
                        name="f_Designation"
                        value={formValues.f_Designation}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                    >
                        <option value="">Select Designation</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>

                {/* Gender */}
                <div className="mb-4">
                    <span className="block text-gray-700">Gender:</span>
                    <div className="flex items-center">
                        <input type="radio" id="male" name="f_Gender" value="Male" onChange={handleInputChange} required className="mr-2" />
                        <label htmlFor="male" className="mr-4">Male</label>
                        <input type="radio" id="female" name="f_Gender" value="Female" onChange={handleInputChange} required className="mr-2" />
                        <label htmlFor="female">Female</label>
                    </div>
                </div>

                {/* Course */}
                <div className="mb-4">
                    <span className="block text-gray-700">Course:</span>
                    <div className="flex flex-row gap-[15px]">
                        {["MCA", "BCA", "BSC"].map((course) => (
                            <label key={course} className="inline-flex items-center mt-2">
                                <input
                                    type="checkbox"
                                    name="f_Course"
                                    value={course}
                                    checked={formValues.f_Course.includes(course)}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                />
                                <span>{course}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Image Upload */}
                <div className="mb-4">
                    <label htmlFor="imgUpload" className="block text-gray-700">Image Upload:</label>
                    <input
                        type="file"
                        id="imgUpload"
                        name="f_Image"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                    />
                    {previewImage && (
                        <img src={previewImage} alt="Preview" className="mt-2 w-20 h-20 rounded-full object-cover" />
                    )}
                </div>

                {/* Submit */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;
