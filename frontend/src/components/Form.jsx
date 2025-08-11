import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

const Form = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    f_Id: uuidV4(), // if backend still needs this
    f_Name: "",
    f_Email: "",
    f_Mobile: "",
    f_Designation: "",
    f_Gender: "",
    f_Course: "",
    f_Image: null // store file object
  });

  // Handle text/radio/select/checkbox changes
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      // if multiple courses are allowed, handle array
      setFormValues({
        ...formValues,
        f_Course: checked ? value : "" // simple single select
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value
      });
    }
  };

  // Handle file change
  const handleFileChange = (event) => {
    setFormValues({
      ...formValues,
      f_Image: event.target.files[0]
    });
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();

    // Prepare multipart form data
    const data = new FormData();
    data.append("f_Id", formValues.f_Id);
    data.append("f_Name", formValues.f_Name);
    data.append("f_Email", formValues.f_Email);
    data.append("f_Mobile", formValues.f_Mobile);
    data.append("f_Designation", formValues.f_Designation);
    data.append("f_Gender", formValues.f_Gender);
    data.append("f_Course", formValues.f_Course);
    if (formValues.f_Image) {
      data.append("f_Image", formValues.f_Image);
    }

    try {
      const response = await axios.post(
        "https://mern-employee-management-bep4.onrender.com/api/employee/createmp",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );
      alert("Employee created!");
      navigate("/employeelist");
    } catch (error) {
      console.error(error);
      alert("Error creating employee");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <form onSubmit={handleFormSubmission} encType="multipart/form-data">
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Name:
          </label>
          <input
            type="text"
            id="name"
            onChange={handleInputChange}
            value={formValues.f_Name}
            name="f_Name"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            onChange={handleInputChange}
            value={formValues.f_Email}
            name="f_Email"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        {/* Mobile */}
        <div className="mb-4">
          <label htmlFor="mobile" className="block text-gray-700">
            Mobile No:
          </label>
          <input
            type="tel"
            id="mobile"
            onChange={handleInputChange}
            value={formValues.f_Mobile}
            name="f_Mobile"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        {/* Designation */}
        <div className="mb-4">
          <label htmlFor="designation" className="block text-gray-700">
            Designation:
          </label>
          <select
            id="designation"
            onChange={handleInputChange}
            value={formValues.f_Designation}
            name="f_Designation"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          >
            <option value="">Select</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
            <option value="MERN Developer">MERN Developer</option>
          </select>
        </div>

        {/* Gender */}
        <div className="mb-4">
          <span className="block text-gray-700">Gender:</span>
          <div className="flex items-center">
            <input
              type="radio"
              id="male"
              onChange={handleInputChange}
              name="f_Gender"
              value="Male"
              required
              className="mr-2"
            />
            <label htmlFor="male" className="mr-4">
              Male
            </label>
            <input
              type="radio"
              id="female"
              onChange={handleInputChange}
              name="f_Gender"
              value="Female"
              required
              className="mr-2"
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>

        {/* Course */}
        <div className="mb-4">
          <span className="block text-gray-700">Course:</span>
          <div className="flex flex-row gap-[15px]">
            <label className="inline-flex items-center mt-2">
              <input
                type="checkbox"
                onChange={handleInputChange}
                name="f_Course"
                value="MCA"
                className="mr-2"
              />
              <span>MCA</span>
            </label>
            <label className="inline-flex items-center mt-2">
              <input
                type="checkbox"
                onChange={handleInputChange}
                name="f_Course"
                value="BCA"
                className="mr-2"
              />
              <span>BCA</span>
            </label>
            <label className="inline-flex items-center mt-2">
              <input
                type="checkbox"
                onChange={handleInputChange}
                name="f_Course"
                value="BTech"
                className="mr-2"
              />
              <span>BTech</span>
            </label>
          </div>
        </div>

        {/* File Upload */}
        <div className="mb-4">
          <label htmlFor="imgUpload" className="block text-gray-700">
            Image Upload:
          </label>
          <input
            type="file"
            id="imgUpload"
            name="f_Image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
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
