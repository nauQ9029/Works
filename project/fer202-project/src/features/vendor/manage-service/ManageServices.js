import React, { useEffect, useState } from 'react';
import './ManageServices.css';
import axiosInstance from '../../../services/axiosInstance';
import Pagination from '../../../components/common/Pagination';
import ServiceCard from './ServiceCard';
import { fetchServiceAPI } from './serviceAPI';
import ModalAddService from './ModalAddService';
import {FaPlus } from "react-icons/fa";

const ManageServices = () => {
    const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);

    const fetchServices = async () => {
        const response = await fetchServiceAPI();
        const data = await response.data;
        setServices(data);
    };

    useEffect(() => {
        fetchServices();
    }, []);

    

    
        const itemsPerPage = 8;
        const [currentPage, setCurrentPage] = useState(1);
    
        const totalPages = Math.ceil(services.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const currentItems = services.slice(startIndex, startIndex + itemsPerPage);
    return (
        <div className="manage-services">
            <div className="d-flex gap-2">
          <button
            className="add-btn w-20"
            style={{
              color: "rgb(0, 0, 0)",
              border: `1px solid rgb(0, 0, 0)`,
              backgroundColor: "transparent",
            }}
            onClick={() => setShowModal(true)}
          >
            <FaPlus className="me-1" />
            Service
          </button>
        </div>
            <div className="store-grid">
                {currentItems.map(service => (
                   <ServiceCard fetchServices={fetchServices} service = {service}/>
                ))}
            </div>
            
                  <ModalAddService fetchServices={fetchServices} show={showModal} onClose={() => setShowModal(false)} />
            <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
        </div>
    );
};

export default ManageServices;
