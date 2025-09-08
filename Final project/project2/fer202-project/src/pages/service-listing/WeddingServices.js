import Sidebar from "./wedding/SideBar";
import WeddingCard from "./wedding/WeddingCard";
import "./styles/services.css"
import { getWeddingServices } from "../data/data"
import CategoryFilter from "./wedding/CategoryFilter";
import Pagination from "../../components/common/Pagination";
import { useState, useEffect } from "react";

function WeddingServices() {

  const [weddingServices, setWeddingServices] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const weddingServices = await getWeddingServices();
      setWeddingServices(weddingServices);
    };

    fetchData();
  }, []);

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const filterByPriceRange = (services, selectedRanges) => {
    if (selectedRanges.length === 0) return services;

    return services.filter(service => {
      const price = service.price;

      return selectedRanges.some(range => {
        if (range === 'Dưới 3tr') return price < 3000000;
        if (range === '3tr - 5tr') return price >= 3000000 && price <= 5000000;
        if (range === '5tr - 7tr') return price > 5000000 && price <= 7000000;
        if (range === '7tr - 10tr') return price > 7000000 && price <= 10000000;
        if (range === 'Trên 10tr') return price > 10000000;
        return true;
      });
    });
  };

  const filteredServices = filterByPriceRange(weddingServices, selectedPriceRanges);
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredServices.slice(startIndex, startIndex + itemsPerPage);


  // const totalPages = Math.ceil(weddingServices.length / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const currentItems = weddingServices.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <div className="header-section">
        <h2>Dịch vụ cưới chuyên nghiệp</h2>
        <p>Tìm và đặt lịch với các chuyên gia tổ chức đám cưới hoàn hảo để biến đám cưới trong mơ của bạn thành hiện thực</p>
      </div>
      <CategoryFilter />
      <div className="stores-content">
        <Sidebar
          selectedPriceRanges={selectedPriceRanges}
          setSelectedPriceRanges={setSelectedPriceRanges}
        />

        <main className="main-content">
          <div className="header-bar">
            <div>View: <i className="bi bi-grid-fill"></i> <i className="bi bi-list"></i></div>
            <div>Sort by: <select><option>Featured</option></select></div>
          </div>
          <div className="store-grid">
            {currentItems.map(service => (
              <WeddingCard key={service.id} service={service} />
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

export default WeddingServices;