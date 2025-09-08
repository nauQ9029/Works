import { useState, useEffect } from "react";
import AccessoryCard from "./accessories/AccessoryCard";
import "./styles/services.css"
import { getAccessoryServices } from "../data/data"
import SearchBar from "./accessories/SearchBar";
import Pagination from "../../components/common/Pagination";

function AccessoryServices() {

  const [accessoryService, setAccessoryServices] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
      const weddingServices = await getAccessoryServices();
      setAccessoryServices(weddingServices); 
  };

  fetchData();
}, []);

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(accessoryService.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = accessoryService.slice(startIndex, startIndex + itemsPerPage);
  return (
    <>
      <div className="header-section">
        <h2>Tất cả các phụ kiện ở đây</h2><br />
        <p>Tìm kiếm những sản phẩm cần thiết cho đám cưới của bạn</p>
        <SearchBar />
      </div>
      <div className="stores-content">
        <main className="main-content">
          <div className="header-bar">
            <p>Phụ kiện phổ biến</p>
          </div>
          <div className="store-grid">
            {currentItems.map(item => (
              <AccessoryCard key={item.id} item={item} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </main>
      </div>
    </>
  );
}

export default AccessoryServices;