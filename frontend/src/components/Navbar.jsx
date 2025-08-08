import React from 'react';

const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-between items-center bg-black text-white text-lg font-bold p-4">
        <div className="flex gap-16">
          <a href="/" className=" cursor-pointer">Home</a>
          <a href="/employeelist" className="hover:text-gray-300 cursor-pointer">Employee List</a>
        </div> 
        <div className="flex gap-16">
          <button className="hover:text-gray-300 cursor-pointer">Logout</button>
        </div> 
      </nav>
     
    </div> 
  );
}

export default Navbar;
