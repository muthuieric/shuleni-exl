import React from "react";

function Search({ search, onSearchChange }) {
  return (
    <nav className="pb-2 pt-3">
      <input
        type="text"
        name="search"
        placeholder="Search..."
        autoComplete="off"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full p-2 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400"
      />
    </nav>
  );
}

export default Search;
