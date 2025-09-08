import React, { useEffect, useState } from 'react';
import './UserList.css';
import Pagination from '../../../components/common/Pagination';
import { fetchUser, changeStatusUser } from './userService';

const UserList = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchUser();
                setUsers(data);
            } catch (error) {
                console.error("Error loading users:", error);
            }
        };

        loadUsers();
    }, []);

    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(users.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = users.slice(startIndex, startIndex + itemsPerPage);

    const onToggleStatus = async(userId, status) => {
        const newStatus = status === "active" ? "inactive" : "active"
        window.confirm(status === "active" ? "Ban this user" : "Unban this user?", userId)
        try {
             await changeStatusUser(userId, newStatus)
             const data = await fetchUser();
                setUsers(data);
        } catch (error) {
            console.error("Error change status users:", error);
        }
    }
    return (
        <div className="user-list-container">
            <h2 className="user-list-title">User Management</h2>
            <div className="user-table">
                <div className="user-table-header">
                    <div>#</div>
                    <div>Name</div>
                    <div>Email</div>
                    <div>Phone</div>
                    <div>Role</div>
                    <div>Status</div>
                    <div>Vendor Info</div>
                    <div>Action</div>
                </div>
                {users.map((user, index) => (
                    <div key={user.userId} className="user-table-row">
                        <div>{index + 1}</div>
                        <div>{user.fullName}</div>
                        <div>{user.email}</div>
                        <div>{user.phone}</div>
                        <div>{user.role}</div>
                        <span>
                            <span className={`status-badge ${user.status}`}>
                                {user.status}
                            </span>

                        </span>
                        <div>
                            {user.vendorProfile ? (
                                <div className="vendor-info">
                                    <div><strong>{user.vendorProfile.businessName}</strong></div>
                                    <div>MST: {user.vendorProfile.mst}</div>
                                    <div>{user.vendorProfile.description}</div>
                                </div>
                            ) : (
                                <span className="no-vendor">No Vendor</span>
                            )}
                        </div>
                        <div>
                            {user.role !== 'admin' ? (
                                <button
                                    className={`status-toggle-btn status-badge ${!user.status}`}
                                    onClick={() => onToggleStatus(user.userId, user.status)}
                                >
                                    {user.status === 'active' ? 'Ban' : 'Unban'}
                                </button>
                            ) : (
                                <span className="text-muted">--</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
};

export default UserList;
