import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Contextsfetch } from '../context/AuthContext';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [pass, setPass] = useState('');
  const { login } = useContext(Contextsfetch);

  const fetchUser = async () => {
    try {
      const params = {
        f_userName: userName,
        f_Pwd: pass
      };

      const response = await axios.get("https://mern-employee-management-bep4.onrender.com/api/user/findUser", { params });

      if (response.data && response.data.f_userName) {
        localStorage.setItem("authUser", response.data.f_userName);
        login(); // only set auth after valid user
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed. Please try again later.");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault(); // prevent form reload
    fetchUser();
  };

  return (
    <div className="w-full min-h-screen font-poppinsRegular text-white  bg-black">
      <div className="w-full">
        <p className="md:w-[20%] w-full px-10 py-7 text-2xl">Login page</p>
      </div>
      <form
        className="bg-custom-color3 mt-24 lg:w-[50%] w-full md:w-[50%] m-auto text-white rounded-xl"
        onSubmit={handleLogin}
      >
        <div className="object-cover rounded-lg p-8 bg-purple-200">
          <div className="container w-full py-6 flex flex-col lg:flex-row gap-5">
            <div className="lg:w-[70%] m-auto w-full flex gap-6">
              <label
                className="block text-gray-700 md:text-xl text-sm font-poppinsBold py-2"
                htmlFor="username"
              >
                UserName
              </label>
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="shadow text-sm appearance-none rounded w-full h-12 p-2 text-black leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Enter your UserName"
                required
              />
            </div>
          </div>

          <div className="container w-full py-6 flex flex-col lg:flex-row gap-5">
            <div className="lg:w-[70%] m-auto w-full flex gap-8">
              <label
                className="block text-gray-700 md:text-xl text-sm font-poppinsBold py-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="shadow text-sm appearance-none rounded w-full h-12 p-2 text-black leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                id="password"
                placeholder="Enter your Password"
                required
              />
            </div>
          </div>

          <div className="m-auto lg:w-[62%] w-full text-center">
            <button
              className=" bg-black lg:w-[88%] text-xl w-full h-12 hover:bg-custom-color1 text-white font-poppinsBold rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
