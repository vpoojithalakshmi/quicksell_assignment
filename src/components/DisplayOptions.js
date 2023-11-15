// DisplayOptions.js
import React from 'react';
import './DisplayOptions.css';

const DisplayOptions = ({ onGroupChange, onSortChange }) => {
  return (
    <div className="display-options">
      <label>Group By:</label>
      <select onChange={onGroupChange}>
        <option value="status">Status</option>
        <option value="user">User</option>
        <option value="priority">Priority</option>
      </select>

      <label>Sort By:</label>
      <select onChange={onSortChange}>
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
};

export default DisplayOptions;

// Add the following CSS at the end of the file
