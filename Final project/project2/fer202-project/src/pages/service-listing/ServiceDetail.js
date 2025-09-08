
import "./styles/service-detail.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getServiceById } from "../data/data";
import { addToCart } from "../../features/manage-cart/cartSlice";

function ServiceDetail() {
  const {id} = useParams();

  const [service, setService] = useState([]);

  const dispatch = useDispatch();
  
    const handleAddToCart = (e, service) => {
      e.preventDefault();
      alert("Added to cart! ")
      dispatch(addToCart(service));
    };

  useEffect(() => {
    const fetchData = async () => {
      console.log(id)
      const service = await getServiceById(id);
      setService(service);
    };

    fetchData();
  }, []);
  return (
    <div className="service-detail-wrapper">
      <div className="service-detail-grid">
        {/* Left: Image */}
        <div className="service-image-section">
          <img
            className="service-main-image"
            src={service.imageDemo}
            alt={service.title}
          />
        </div>

        {/* Right: Content */}
        <div className="service-info-section">
          <div className="service-badge">Wedding Service</div>

          <h1 className="service-title">{service.title}</h1>

          <div className="service-price">
            {service.price?.toLocaleString() ?? "0"}₫
          </div>

          <p className="service-description">
            {service.description}
          </p>

          <div className="service-meta">
            <div><strong>Danh mục:</strong> {service.category || "Dịch vụ cưới"}</div>
            <div><strong>Nhà cung cấp:</strong> {service.vendor?.name || "Đang cập nhật"}</div>
            <div><strong>Ngày đăng:</strong> {new Date(service.createdAt).toLocaleDateString()}</div>
          </div>

          <div className="service-actions">
            <button onClick={(e)=>handleAddToCart(e, service)} className="btn-primary">Đặt dịch vụ</button>
            <button className="btn-outline">❤️</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetail;
