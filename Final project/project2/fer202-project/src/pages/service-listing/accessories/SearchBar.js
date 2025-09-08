import React from 'react';
import '../../../styles/search-bar.css';

const SearchBar = () => {
  return (
    <div className="decor-search-bar">
      <label className="search-label">Bạn đang tìm kiếm điều gì?</label>
      <div className="search-input-wrapper">
        <i className="bi bi-search"></i>
        <input type="text" placeholder="Search vendors..." />
        <select>
          <option>Tất cả</option>
          <option>Địa điểm</option>
          <option>Dịch vụ</option>
        </select>
        <button className="search-btn">Search</button>
      </div>
    </div>
  );
};

export default SearchBar;
