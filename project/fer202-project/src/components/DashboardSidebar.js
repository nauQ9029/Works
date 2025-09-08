import { useState, useEffect } from "react";
import { FaHome, FaBox, FaClipboardList, FaStar, FaTags, FaPlus } from "react-icons/fa";
import { FaUsers, FaChartBar, FaCog, FaUserShield } from "react-icons/fa";
import { useLocation } from "react-router-dom";

import { Link } from "react-router-dom";

const primaryColor = "#201718";
const VendorSidebar = () => {
  const location = useLocation();
  const [active, setActive] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <FaHome />, path: "/vendor/dashboard" },
    { id: "users", label: "Services", icon: <FaUsers />, path: "/vendor/services" },
    { id: "orders", label: "Bookings", icon: <FaClipboardList />, path: "/vendor/bookings" },
    { id: "reports", label: "Reports", icon: <FaChartBar />, path: "/vendor/dashboard" },
    { id: "settings", label: "Settings", icon: <FaCog />, path: "/vendor/settings" },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const matchedItem = menuItems.find((item) => currentPath.includes(item.id));
    if (matchedItem) setActive(matchedItem.id);
  }, [location.pathname]);

  return (
    <>
      <div className="d-flex flex-column bg-white p-3 shadow-sm" style={{ width: "250px", minHeight: "100vh" }}>
        <div className="logo" style={{ marginBottom: "60px" }}>
          <a href="../"><span className="logo-hat">Hat</span><span className="logo-de">De</span></a>
        </div>

        <ul className="nav flex-column mb-4">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`nav-item mb-2 ${active === item.id ? "text-white rounded px-2 py-2" : "text-dark"}`}
              style={active === item.id ? { backgroundColor: primaryColor } : { cursor: "pointer" }}
              onClick={() => setActive(item.id)}
            >
              <Link to={item.path} className="text-decoration-none text-reset d-flex align-items-center">
                <span className="me-2 fs-5">{item.icon}</span>
                <span className="fw-semibold">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="d-flex gap-2">
        <div className="mt-4">
                            <a href='../logout'>
                                <button className="btn btn-link text-danger w-100 text-start">
                                    <i className="bi bi-box-arrow-right me-2"></i> Đăng xuất
                                </button>
                            </a>
                        </div>
      </div>
        
      </div>
</>
  );
};

export default VendorSidebar;



export const AdminSidebar = () => {
  const location = useLocation();
  const [active, setActive] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <FaHome />, path: "/admin/dashboard" },
    { id: "users", label: "Users", icon: <FaUsers />, path: "/admin/users" },
    { id: "orders", label: "Bookings", icon: <FaClipboardList />, path: "/admin/bookings" },
    { id: "reports", label: "Reports", icon: <FaChartBar />, path: "/admin/dashboard" },
    { id: "settings", label: "Settings", icon: <FaCog />, path: "/admin/settings" },
    { id: "admins", label: "Admins", icon: <FaUserShield />, path: "/admin/dashboard" },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const matchedItem = menuItems.find((item) => currentPath.includes(item.id));
    if (matchedItem) setActive(matchedItem.id);
  }, [location.pathname]);

  return (
    <div className="d-flex flex-column bg-white p-3 shadow-sm" style={{ width: "250px", minHeight: "100vh" }}>
      <div className="logo" style={{ marginBottom: "60px" }}>
        <a href="../"><span className="logo-hat">Hat</span><span className="logo-de">De</span></a>
      </div>

      <ul className="nav flex-column mb-4">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={`nav-item mb-2 ${active === item.id ? "text-white rounded px-2 py-2" : "text-dark"}`}
            style={active === item.id ? { backgroundColor: primaryColor } : { cursor: "pointer" }}
            onClick={() => setActive(item.id)}
          >
            <Link to={item.path} className="text-decoration-none text-reset d-flex align-items-center">
              <span className="me-2 fs-5">{item.icon}</span>
              <span className="fw-semibold">{item.label}</span>
            </Link>
          </li>
        ))}
        
      </ul>

      <div className="d-flex gap-2">
        <div className="mt-4">
                            <a href='../logout'>
                                <button className="btn btn-link text-danger w-100 text-start">
                                    <i className="bi bi-box-arrow-right me-2"></i> Đăng xuất
                                </button>
                            </a>
                        </div>
      </div>
    </div>
  );
};

