import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg p-2 fixed top-0 left-0 right-0 z-10">
      <div className="mx-auto px-6 flex justify-between items-center">
        <div>
          <a href="/" className="font-bold text-blue-500 text-2xl hover:text-blue-600 transition duration-300">
            Shuleni
          </a>
        </div>

        <div className="flex items-center">
          <a href="/signup" className="py-2 px-2 font-medium text-black-500 hover:text-gray-500 transition duration-300">
            Sign Up
          </a>
          <a href="/login" className="py-2 px-4 font-medium bg-blue-500 text-white rounded-full hover:bg-blue-600">
            Log In
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
