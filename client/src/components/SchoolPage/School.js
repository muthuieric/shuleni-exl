import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../SideBar";

export const Schools = () => {
  const [schools, setSchools] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/schools")
      .then((res) => res.json())
      .then((data) => {
        setSchools(data);
      })
      .catch((error) => {
        console.error("Error fetching schools data:", error);
      });
  }, []);

  const filteredSchools = schools
    ? schools.filter((school) =>
        school.school_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handlePrint = () => {
    window.print();
  };

  const handleDeleteClick = async (id) => {
    const response = await fetch(`/schools/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setSchools(schools.filter((school) => school.id !== id));
      alert("Deleted Successfully");
    } else {
      alert("Failed to delete");
    }
  };

  const handleUpdateSchools = (id) => {
    const updatedSchoolsArray = schools.filter((school) => school.id !== id);
    setSchools(updatedSchoolsArray);
  };

  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="w-full p-2 border-r border-gray-200">
        <h1 className="text-blue-600 text-2xl mb-2 font-bold text-center">Schools</h1>

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
              <Link to="/add-school">
                <button className="bg-blue-600 hover-bg-blue-600 text-white font-bold px-4 py-3 rounded-xl cursor-pointer">
                  Add School
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSchools.length === 0 ? (
            <div className="text-center text-gray-600">No records found.</div>
          ) : (
            filteredSchools.map((school) => (
              <div
                key={school.id}
                className="bg-white shadow-md rounded-xl p-2"
              >
                <h2 className="text-2xl font-semibold ">{school.school_name}</h2>
                <img
                  src={school.poster}
                  alt={school.school_name}
                  style={{ maxWidth: "100%" }}
                  className="rounded-xl w-full"
                />
                <p className="text-xl font-medium">Location: {school.location}</p>
                <p className="text-sm font-normal">Created At: {school.created_at}</p>
                <div className="flex justify-center">
  <Link to={`/schools/${school.id}`}>
    <button
      onClick={() => handleUpdateSchools(school.id)}
      className="text-blue-600 hover:text-blue-700 mr-2 rounded px-3 py-1 border border-blue-300 hover:border-blue-400"
    >
      Edit
    </button>
  </Link>
  <button
    onClick={() => handleDeleteClick(school.id)}
    className="text-red-500 hover:text-red-600 rounded px-3 py-1 border border-red-300 hover:border-red-400"
  >
    Delete
  </button>
</div>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Schools;
