import React from 'react';

const SignupForm = ({ onClose, onSwitchToSignIn }) => {
  const handleSignup = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // You can access form data using e.target
    // Close the signup form when signup is successful
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-4 md:p-8 w-full max-w-md border border-gray-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-black">Create an Account</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-black focus:outline-none flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Phone"
              name="phone"
              className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Repeat Password"
              name="repeatPassword"
              className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-none"
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-4 py-2 font-semibold"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-md text-black font-semibold">
            Already have an account?{' '}
            <span
              onClick={onSwitchToSignIn}
              className="text-blue-500 cursor-pointer font-semibold"
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
