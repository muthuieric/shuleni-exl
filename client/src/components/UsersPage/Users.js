import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../SideBar";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users data:", error);
      });
  }, []);

  const filteredUsers = users
    ? users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handlePrint = () => {
    window.print();
  };

  const handleDeleteClick = async (id) => {
    const response = await fetch(`/users/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setUsers(users.filter((user) => user.id !== id));
      alert("Deleted Successfully");
    } else {
      alert("Failed to delete");
    }
  };

  const handleUpdateUsers = (id) => {
    const updatedUsersArray = users.filter((user) => user.id !== id);
    setUsers(updatedUsersArray);
  };

  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="w-full p-2 border-r border-gray-200">
        <h1 className="text-blue-600 text-2xl mb-2 font-bold text-center">Users</h1>

    <div className="m-4 flex flex-col items-center justify-center sm:flex-row">
  <input
    id="search"
    type="text"
    placeholder="Search..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-3/4 p-2 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400"
  />
  <div className="flex flex-row ">
  <div className="m-2 sm:m-4 flex items-center justify-center">
    <Link to="/add-users">
      <button className="bg-blue-600 hover-bg-blue-600 text-white font-bold px-4 py-3 rounded-xl cursor-pointer">
        Add User
      </button>
    </Link>
  </div>
  <div className="m-2 sm:m-4 flex items-center justify-center">
    <button
      onClick={handlePrint}
      className="bg-blue-600 hover-bg-blue-700 text-white font-bold px-4 py-3 rounded-xl cursor-pointer"
    >
      Print
    </button>
  </div>
</div>
</div>

        <div className="bg-white shadow-md rounded-xl p-2 overflow-x-auto">
          <table className="w-full rounded-xl">
            <thead >
              <tr className="bg-blue-600 rounded-xl text-white">
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Role</th>
                <th className="py-2 px-4">School</th>
                <th className="py-2 px-4">Phone</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-2 px-4 text-center">
                    No records found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, i) => (
                  <tr key={i} className="border-b text-center">
                    <td className="py-2 px-4">{user.id}</td>
                    <td className="py-2 px-4">{user.name}</td>
                    <td className="py-2 px-4">{user.role}</td>
                    <td className="py-2 px-4">{user.school}</td>
                    <td className="py-2 px-4">{user.phone}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">
                      <div className="flex items-center justify-center">
                        <Link to={`/users/${user.id}`}>
                          <button
                            onClick={() => handleUpdateUsers(user.id)}
                            className="flex items-center text-gray-500 hover:text-gray-600 mr-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 cursor-pointer mr-1"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                              />
                            </svg>
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(user.id)}
                          className="flex items-center text-red-500 hover:text-red-600"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
