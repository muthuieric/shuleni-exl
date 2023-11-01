import React from 'react';
import { NavLink } from 'react-router-dom';

const handleLogout = async () => {
  try {
    const response = await fetch('/logout', { method: 'GET' });
    if (response.ok) {
      
    } else {
      console.error('Logout failed:', response.status);
    }
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

function Sidebar() {
  return (
    
    <div className="fixed bottom-0 left-0 w-full lg:w-40 lg:m-2 lg:h-screen lg:rounded-xl lg:relative lg:top-0 bg-blue-600 text-white flex flex-col items-center ">
      <h2 className="hidden lg:block p-4 mx-5 mt-4 mb-6 text-white font-bold text-xl">Shuleni</h2>

      <div className=" w-full flex justify-around items-center lg:flex-col  ">
        <NavLink
          to="/profile"
          className="flex flex-col items-center justify-center text-white font-bold w-12 h-12 p-2 hover:text-white"
          activeClassName="bg-blue-800"
        >
          <div className="lg:flex items-center ">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={1.8}
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632"
            />
          </svg>
          <span>Profile</span>
          </div>
        </NavLink>

        <NavLink
          to="/users"
          className="flex flex-col items-center justify-center text-white font-bold w-12 h-12 p-2 hover:text-white"
          activeClassName="bg-blue-800"
        >
          <div className="lg:flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={1.8}
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0"
            />
          </svg>
          <span>Users</span>
          </div>
        </NavLink>

        <NavLink
          to="/resources"
          className="flex flex-col items-center justify-center text-white font-bold w-12 h-12 p-2 hover:text-white"
          activeClassName="bg-blue-800"
        >
          <div className="lg:flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={1.8}
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292"
            />
          </svg>
          <span>Resources</span>
          </div>
        </NavLink>

        <NavLink
          to="/chat"
          className="flex flex-col items-center justify-center text-white font-bold w-12 h-12 p-2 hover:text-white"
          activeClassName="bg-blue-800"
        >
          <div className="lg:flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={1.8}
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.810.22 1.668.337 2.555.337z"
            />
          </svg>
          <span>Chat</span>
          </div>
        </NavLink>

        <NavLink
          to="/"
          className="flex flex-col items-center justify-center text-white font-bold w-12 h-12 p-2 hover:text-white"
          activeClassName="bg-blue-800"
          onClick={handleLogout}
        >
          <div className="lg:flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={1.8}
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
          <span>Logout</span>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
