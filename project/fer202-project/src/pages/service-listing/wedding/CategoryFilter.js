import React, { useState } from 'react';
import { categories } from './filterdata';
import '../../../styles/common/category-filter.css'

function CategoryFilter() {
  const [active, setActive] = useState('All');

  return (
    <div className="category-filter">
      <button
        className={`category-btn ${active === 'All' ? 'active' : ''}`}
        onClick={() => setActive('All')}
      >
        All
      </button>
      {categories.map((cat, index) => (
        <button
          key={index}
          className={`category-btn ${active === cat ? 'active' : ''}`}
          onClick={() => setActive(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
