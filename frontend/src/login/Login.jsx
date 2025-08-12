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
        login();
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed. Please try again later.");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetchUser();
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-900 via-purple-900 to-black flex flex-col justify-center px-4">
      <div className="max-w-md w-full mx-auto bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-purple-700">
        <div className="text-center py-10 px-8 border-b border-purple-600">
          <h1 className="text-white text-3xl font-extrabold tracking-wide font-poppinsBold">Welcome Back</h1>
          <p className="text-purple-300 mt-2 text-sm font-poppinsRegular">
            Please login to your account
          </p>
        </div>

        <form onSubmit={handleLogin} className="p-8 space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-semibold text-purple-200 font-poppinsBold"
            >
              Username
            </label>
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              id="username"
              type="text"
              placeholder="Enter your username"
              required
              className="w-full px-4 py-3 rounded-lg bg-purple-900 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-semibold text-purple-200 font-poppinsBold"
            >
              Password
            </label>
            <input
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              id="password"
              type="password"
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 rounded-lg bg-purple-900 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white text-lg font-poppinsBold transition"
          >
            Login
          </button>
        </form>
      </div>

      <p className="mt-8 text-center text-purple-400 text-sm font-poppinsRegular">
        &copy; 2025 Your Company. All rights reserved.
      </p>
    </div>
  );
};

export default Login;
