import React from 'react';

const FilterSort = ({ filter, sort, onFilterChange, onSortChange }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <div>
        <h3>Filter Tasks:</h3>
        <select value={filter} onChange={(e) => onFilterChange(e.target.value)} style={{ marginRight: '10px' }}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
      <div>
        <h3>Sort Tasks:</h3>
        <select value={sort} onChange={(e) => onSortChange(e.target.value)}>
          <option value="date">Date</option>
          <option value="title">Title</option>
          <option value="priority">Priority</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSort;
