import React from 'react';
import '../auth-style/profile.css';
import { useSelector, useDispatch } from 'react-redux';

// const user = {
//     name: "Nguyen Van A",
//     email: "nguyenvana@example.com",
//     address: "123 Nguyen Hue, District 1, Ho Chi Minh City, Vietnam",
//     phone: "+84 123 456 789",
// };
// const a = {
//     fullname: 'Lê Văn Chính', 
//     email: 'levanchinh2422003@gmail.com', 
//     phone: '0123456789', 
//     address: 'Xuân Thủy, Lệ Thủy, Quảng Bình', 
//     role: 'vendor'
// }

const UserProfile = () => {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    console.log(user)
    return (
        <div className="container py-4">
            <div className="row shadow rounded bg-white">
                {/* Sidebar */}
                <div className="col-md-3 border-end px-4 py-4">
                    <div className="text-center mb-4">
                        <div
                            className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto"
                            style={{ width: 100, height: 100 }}
                        >
                            <i className="bi bi-person-circle" style={{ fontSize: '64px', color: '#6c757d' }}></i>
                        </div>

                        <h6 className="mt-2">{user.fullname}</h6>
                        <p className="text-muted small">{user.email}</p>
                    </div>

                    <ul className="list-unstyled">
                        
                        <li className="mb-3">
                            <button className="btn btn-pink w-100 text-start fw-bold">
                                <i className="bi bi-person me-2"></i> Thông tin cá nhân
                            </button>
                        </li>
                        <li className="mb-3">
                            <a href="./booking-history">
                                <button className="btn btn-light w-100 text-start">
                                    <i className="bi bi-clock-history me-2"></i> Lịch sử đặt hàng
                                </button>
                            </a>
                        </li>
                        <li className="mb-3">
                            <button className="btn btn-light w-100 text-start">
                                <i className="bi bi-heart me-2"></i> Danh sách yêu thích
                            </button>
                        </li>
                        <li className="mb-3">
                            <button className="btn btn-light w-100 text-start">
                                <i className="bi bi-credit-card me-2"></i> Phương thức thanh toán
                            </button>
                        </li>
                        <li className="mb-3">
                            <button className="btn btn-light w-100 text-start">
                                <i className="bi bi-gear me-2"></i> Cài đặt
                            </button>
                        </li>
                        {isAuthenticated && user?.role === "vendor" && (
                            <a href="../vendor/dashboard">
                                <button className="btn btn-light w-100 text-start">
                                    <i className="bi bi-speedometer2 me-2"></i> Quản lí Cửa hàng
                                </button>
                            </a>
                        )}

                        {isAuthenticated && user?.role === "admin" && (
                            <a href="../admin/dashboard">
                                <button className="btn btn-light w-100 text-start">
                                    <i className="bi bi-shield-lock me-2"></i> Quản lí Dịch vụ web
                                </button>
                            </a>
                        )}
                        <li className="mt-4">
                            <a href='./logout'>
                                <button className="btn btn-link text-danger w-100 text-start">
                                    <i className="bi bi-box-arrow-right me-2"></i> Đăng xuất
                                </button>
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Thông tin chi tiết */}
                <div className="user-inf col-md-8 p-4">
                    <h5 className="fw-bold mb-4">Thông tin cá nhân</h5>

                    <div className="mb-3 d-flex align-items-start">
                        <i className="bi bi-house-door me-3 fs-5 text-secondary"></i>
                        <div>
                            <strong>Địa chỉ</strong>
                            <div>{user.address}</div>
                        </div>
                    </div>

                    <div className="mb-3 d-flex align-items-start">
                        <i className="bi bi-telephone me-3 fs-5 text-secondary"></i>
                        <div>
                            <strong>Số điện thoại</strong>
                            <div>{user.phone}</div>
                        </div>
                    </div>

                    <div className="mb-4 d-flex align-items-start">
                        <i className="bi bi-envelope me-3 fs-5 text-secondary"></i>
                        <div>
                            <strong>Email</strong>
                            <div>{user.email}</div>
                        </div>
                    </div>

                    <button className=" btn-pink px-4">Chỉnh sửa thông tin</button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
