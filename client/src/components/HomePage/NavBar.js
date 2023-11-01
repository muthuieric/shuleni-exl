import React, { useState } from "react";
import SignupForm from "./SignUp";
import LoginForm from "./Login";

const Navbar = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const toggleSignup = () => {
    setShowSignup(!showSignup);
    setShowLogin(false); // Close the login form when switching to signup
  };

  const toggleLogin = () => {
    setShowLogin(!showLogin);
    setShowSignup(false); // Close the signup form when switching to login
  };

  return (
    <nav className="bg-white shadow-lg p-2 fixed top-0 left-0 right-0 z-10">
      <div className="mx-auto px-6 flex justify-between items-center">
        <div>
          <a
            href="/"
            className="font-bold text-blue-600 text-2xl hover:text-blue-700 transition duration-300"
          >
            Shuleni
          </a>
        </div>

        <div className="flex items-center">
          <button
            onClick={toggleSignup}
            className="py-2 px-2 font-medium text-black-500 hover:text-gray-500 transition duration-300"
          >
            Sign Up
          </button>
          <button
            onClick={toggleLogin}
            className="py-2 px-4 font-medium bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            Log In
          </button>
        </div>
      </div>

      {showSignup && <SignupForm onClose={toggleSignup} onSwitchToSignIn={toggleLogin} />}
      {showLogin && <LoginForm onClose={toggleLogin} onSwitchToSignUp={toggleSignup} />}

    </nav>
  );
};

export default Navbar;
