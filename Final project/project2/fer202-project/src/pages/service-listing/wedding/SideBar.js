
import { availabilityOptions, priceRanges, ratingOptions } from './filterdata';

export const Sidebar = ({ selectedPriceRanges, setSelectedPriceRanges }) => {

  const handleCheckboxChange = (value) => {
    if (selectedPriceRanges.includes(value)) {
      setSelectedPriceRanges(selectedPriceRanges.filter(item => item !== value));
    } else {
      setSelectedPriceRanges([...selectedPriceRanges, value]);
    }
  };

  return (
    <aside className="sidebar">
      <div className="filter-section">
        <h3>Phạm vi giá</h3>
        <ul>
          {priceRanges.map((item, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={selectedPriceRanges.includes(item)}
                onChange={() => handleCheckboxChange(item)}
              />{" "}
              {item}
            </li>
          ))}
        </ul>
      </div>

      <button className="clear-btn" onClick={() => setSelectedPriceRanges([])}>
        Clear All Filters
      </button>
    </aside>
  );
};


export default Sidebar;
