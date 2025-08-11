import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EmployeeEdit = () => {
  const navigate = useNavigate();
  const { f_Id } = useParams();

  const [formValues, setFormValues] = useState({
    f_Id: "",
    f_Image: null, // file object
    f_Name: "",
    f_Email: "",
    f_Mobile: "",
    f_Designation: "",
    f_Gender: "",
    f_Course: [] // now array
  });

  // Handle input change for text/radio/select
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox" && name === "f_Course") {
      setFormValues((prev) => {
        const courses = [...prev.f_Course];
        if (checked) {
          courses.push(value);
        } else {
          return { ...prev, f_Course: courses.filter((c) => c !== value) };
        }
        return { ...prev, f_Course: courses };
      });
    } else if (type === "file") {
      setFormValues({
        ...formValues,
        [name]: event.target.files[0]
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value
      });
    }
  };

  const updateEmployee = async () => {
    try {
      const formData = new FormData();
      Object.keys(formValues).forEach((key) => {
        if (key === "f_Course") {
          formData.append(key, JSON.stringify(formValues[key])); // store as JSON array
        } else {
          formData.append(key, formValues[key]);
        }
      });

      const response = await axios.put(
        `http://localhost:8088/api/update/employee/${f_Id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data) {
        alert("Updated!");
        navigate("/employeelist");
      } else {
        alert("Invalid Request!");
      }
    } catch (error) {
      console.error(error);
      alert("Update failed");
    }
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    updateEmployee();
  };

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get(`https://mern-employee-management-bep4.onrender.com/api/employee/updatemp/${f_Id}`);
      const result = response.data;

      // Ensure courses are an array
      if (typeof result.f_Course === "string") {
        result.f_Course = result.f_Course.split(",");
      }
      setFormValues(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <form onSubmit={handleFormSubmission} encType="multipart/form-data">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name:</label>
          <input type="text" id="name" onChange={handleInputChange} value={formValues.f_Name} name="f_Name" required className="w-full px-3 py-2 border rounded-md" />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email:</label>
          <input type="email" id="email" onChange={handleInputChange} value={formValues.f_Email} name="f_Email" required className="w-full px-3 py-2 border rounded-md" />
        </div>

        <div className="mb-4">
          <label htmlFor="mobile" className="block text-gray-700">Mobile No:</label>
          <input type="tel" id="mobile" onChange={handleInputChange} value={formValues.f_Mobile} name="f_Mobile" required className="w-full px-3 py-2 border rounded-md" />
        </div>

        <div className="mb-4">
          <label htmlFor="designation" className="block text-gray-700">Designation:</label>
          <select id="designation" onChange={handleInputChange} value={formValues.f_Designation} name="f_Designation" required className="w-full px-3 py-2 border rounded-md">
            <option value="">Select</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <div className="mb-4">
          <span className="block text-gray-700">Gender:</span>
          <div className="flex items-center">
            <input type="radio" id="male" onChange={handleInputChange} checked={formValues.f_Gender === "Male"} name="f_Gender" value="Male" required className="mr-2" />
            <label htmlFor="male" className="mr-4">Male</label>
            <input type="radio" id="female" onChange={handleInputChange} checked={formValues.f_Gender === "Female"} name="f_Gender" value="Female" required className="mr-2" />
            <label htmlFor="female">Female</label>
          </div>
        </div>

        <div className="mb-4">
          <span className="block text-gray-700">Course:</span>
          <div className="flex flex-row gap-4">
            {["MCA", "BCA", "BSC"].map((course) => (
              <label key={course} className="inline-flex items-center">
                <input
                  type="checkbox"
                  onChange={handleInputChange}
                  checked={formValues.f_Course.includes(course)}
                  name="f_Course"
                  value={course}
                  className="mr-2"
                />
                <span>{course}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="imgUpload" className="block text-gray-700">Image Upload:</label>
          <input type="file" id="imgUpload" name="f_Image" accept="image/*" onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" />
        </div>

        <div className="text-center">
          <button type="submit" className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeEdit;
