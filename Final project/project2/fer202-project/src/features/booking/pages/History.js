import React, { useEffect, useState } from 'react';
import "../styles/booking-history.css"
import Pagination from '../../../components/common/Pagination';
import { fetchBookingsByUser } from '../bookingServices';
import { useSelector } from 'react-redux';
import { fetchBookings } from '../test-data';
import { useNavigate } from 'react-router-dom';
import { Space, Table, Tag } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const History = () => {
    const [selectedBooking, setSelectedBooking] = useState(null);


    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const [bookings, setBookings] = useState([]);
    const [fetchStatus, setFetchStatus] = useState(false);
    // const [sortedBookings, setSortedBookings] = useState([]);


    const TABS = ['all', 'pending', 'approved', 'prepare', 'completed', 'cancel'];

    const [filteredBookings, setFilteredBookings] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    useEffect(() => {

        const fetchAndSort = async () => {
            try {
                const data = await fetchBookingsByUser(user.id);
                // setBookings(data);
                setFetchStatus(true)
                var sorted = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                // sorted = sorted.map(booking => ({ ...booking, status: "approved" }));
                setBookings(sorted);
                filterByTab(sorted, activeTab);
            } catch (error) {
                console.error("Lỗi fetch bookings:", error);
            }


        };

        if (user?.id) {
            fetchAndSort();
        }
    }, []);


    useEffect(() => {
        filterByTab(bookings, activeTab);
    }, [activeTab, bookings]);

    const filterByTab = (data, tab) => {
        if (tab === 'all') {
            setFilteredBookings(data);
        } else {
            const filtered = data.filter(booking => booking.status.toLowerCase() === tab);
            setFilteredBookings(filtered);
        }
    };

    const handlePayment = (bookingId, totalPrice) => {
        navigate(`/payment?bookingId=${bookingId}&totalPrice=${totalPrice}`);
    };

    useEffect(() => {
        console.log(selectedBooking)
    }, [selectedBooking])



    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredBookings.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="booking-history">
            <h2>Lịch sử đơn hàng</h2>

            {/* Tabs */}
            <div className="tabs">
                {TABS.map(tab => (
                    <button
                        key={tab}
                        className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => {
                            setActiveTab(tab);
                            setCurrentPage(1);
                        }}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Table */}
            {filteredBookings.length === 0 ? (
                fetchStatus === true ? (
                    <div className='history notify'><p>Không có đơn hàng nào.</p></div>
                ) : (
                    <div className='history notify'><p>Loading...</p></div>
                )
            ) : (
                <>
                    {/* <table className="booking-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Ngày tổ chức</th>
                                <th>Ngày đặt</th>
                                <th>Dịch vụ</th>
                                <th>Thanh toán</th>
                                <th>Trạng thái</th>
                                <th>Tổng tiền</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((booking) => (
                                <tr key={booking.bookingId} onClick={() => setSelectedBooking(booking)} className="clickable-row">
                                    <td>{booking.bookingId}</td>
                                    <td>{new Date(booking.eventDate).toLocaleDateString()}</td>
                                    <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
                                    <td className="booking-services">
                                        {booking.bookingDetails.map(detail => detail.service.title).join(" • ")}
                                    </td>
                                    <td>{booking.paymentMethod}</td>
                                    <td>
                                        <span className={`status-badge status-${booking.status}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td>{Number(booking.totalPrice).toLocaleString()} VND</td>
                                    <td>
                                        {booking.status === 'approved' && booking.paymentMethod === 'vnpay' && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handlePayment(booking.bookingId, booking.totalPrice);
                                                }}
                                                className="pay-button"
                                            >
                                                Thanh toán
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table> */}

                    <Table columns={columns}/>

                    {selectedBooking && (
                        <div className="overlay-booking">
                            <div className="modal-booking">
                                <button className="close-btn" onClick={() => setSelectedBooking(null)}>×</button>
                                <h3>Chi tiết đơn hàng #{selectedBooking.bookingId}</h3>
                                <div className='order-detail-wrapper'>
                                    <div className='service-item'>
                                        <div className="cart-page">

                                            <div className="cart-list">
                                                {selectedBooking.bookingDetails.map(item => (
                                                    <div key={item.service.serviceId} className="cart-item">
                                                        <img src={item.service.imageDemo} alt={item.service.title} />
                                                        <div className="cart-info">
                                                            <p className="item-name">{item.service.title}</p>
                                                            <p className="item-price">{item.service.price.toLocaleString()} VND</p>

                                                        </div>

                                                    </div>
                                                ))}
                                            </div>

                                            <div className="cart-summary">

                                                <div className="summary-row total">
                                                    <strong>Tổng chi phí</strong>
                                                    <strong>{selectedBooking.totalPrice.toLocaleString()} VND</strong>
                                                </div>
                                            </div>



                                        </div>
                                    </div>
                                    <div className='order-information'>
                                        <p><strong>Trạng thái:</strong> <span className={`status-badge status-${selectedBooking.status}`}>{selectedBooking.status}</span></p>
                                        <p><strong>Địa chỉ:</strong> {selectedBooking.user.address}</p>
                                        <p><strong>Ngày tổ chức:</strong> {new Date(selectedBooking.eventDate).toLocaleString()}</p>
                                        <p><strong>Ngày đặt:</strong> {new Date(selectedBooking.createdAt).toLocaleString()}</p>
                                        <p><strong>Ghi chú:</strong> {selectedBooking.note}</p>
                                        <p><strong>Khách hàng:</strong> {selectedBooking.user.fullName}</p>
                                        <p><strong>SĐT:</strong> {selectedBooking.user.phone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}


                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </>
            )}
        </div>
    );

};


export default History;
