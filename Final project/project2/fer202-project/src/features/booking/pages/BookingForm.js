import React, { useState, useEffect } from 'react';
import '../styles/booking-form.css';
import { useSelector, useDispatch } from 'react-redux';
import {
    setUserId, setEventDate, setAddress, setBookingName, removeService
    , setNote, setPaymentMethod, setPhone, setTotalPrice, setBookingInfo, addService
} from '../bookingSlice';
import { addBooking } from '../bookingServices';
import { clearCart } from '../../manage-cart/cartSlice';
import { useNavigate } from 'react-router-dom';

const BookingForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const orderItems = useSelector((state) => state.cart.items)


    const [submitted, setSubmitted] = useState(false)

    const bookingData = useSelector((state) => state.booking)
    const [form, setForm] = useState({
        name: '',
        phone: '',
        address: '',
        eventDate: '',
        city: 'Hà Nội',
        district: '',
        ward: '',
        paymentMethod: 'cash',
        note: '',
    });


    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    useEffect(() => {
        fetch("https://provinces.open-api.vn/api/?depth=1")
            .then(res => res.json())
            .then(data => setProvinces(data));
    }, []);

    const handleCityChange = async (e) => {
        const selectedCityCode = e.target.value;

        const res = await fetch(`https://provinces.open-api.vn/api/p/${selectedCityCode}?depth=2`);
        const data = await res.json();

        setForm({ ...form, city: selectedCityCode, district: '', ward: '' });
        setDistricts(data.districts);
        setWards([]); // reset phường
    };

    const handleDistrictChange = async (e) => {
        const selectedDistrictCode = e.target.value;

        const res = await fetch(`https://provinces.open-api.vn/api/d/${selectedDistrictCode}?depth=2`);
        const data = await res.json();

        setForm({ ...form, district: selectedDistrictCode, ward: '' });
        setWards(data.wards);
    };



    const handleSubmit = (e) => {
        e.preventDefault();

        const selectedCity = provinces.find(p => p.code === Number(form.city));
        const selectedDistrict = districts.find(d => d.code === Number(form.district));
        const selectedWard = wards.find(w => w.code === Number(form.ward));

        const fullAddress = [
            form.address,
            selectedWard?.name,
            selectedDistrict?.name,
            selectedCity?.name
        ].filter(Boolean).join(', ');

        dispatch(setBookingInfo({
            name: form.name,
            phone: form.phone,
            address: fullAddress,
            note: form.note,
            eventDate: form.eventDate,
            paymentMethod: form.paymentMethod
        }));

        dispatch(setUserId(user.id))
        dispatch(setTotalPrice(total))

        orderItems.forEach(item => {
            dispatch(addService(item.serviceId));
        });


        setSubmitted("true")




    };

    useEffect(() => {
        dispatch(removeService())
    }, []);

    useEffect(() => {

        console.log(bookingData);
        if (submitted === "true") {
            addBooking(bookingData);

            alert('Đặt hàng thành công!');

            dispatch(clearCart())

            navigate("/");
        }
    }, [bookingData]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const total = orderItems.reduce((sum, item) => sum + item.price, 0);



    return (
        <form onSubmit={handleSubmit}>
            <div className="booking-form-container">
                <h2>Thanh toán</h2>
                <div></div>
                {orderItems.length > 0 && (
                    <>
                        <div className="form-content">
                            <div className="row">
                                <div className="input-group">
                                    <label>Họ và tên</label>
                                    <input type="text" name="name" value={form.name} onChange={handleChange} required />
                                </div>
                                <div className="input-group">
                                    <label>Số điện thoại</label>
                                    <input type="text" name="phone" value={form.phone} onChange={handleChange} required />
                                </div>
                            </div>



                            <div className="input-group full">
                                <label>Thời gian:</label>
                                <input type="date" name="eventDate" value={form.eventDate} onChange={handleChange} required />
                            </div>

                            <div className="input-group full">
                                <label>Ghi chú:</label>
                                <input type="text" name="note" value={form.note} onChange={handleChange} />
                            </div>

                            <div className="input-group full">
                                <label>Địa chỉ</label>
                                <input type="text" name="address" value={form.address} onChange={handleChange} required />
                            </div>

                            <div className="row">
                                <div className="input-group">
                                    <label>Tỉnh/Thành phố</label>
                                    <select value={form.city} onChange={handleCityChange} required>
                                        <option value="">Chọn tỉnh/thành</option>
                                        {provinces.map(p => (
                                            <option key={p.code} value={p.code}>{p.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="input-group">
                                    <label>Quận/Huyện</label>
                                    <select value={form.district} onChange={handleDistrictChange} required>
                                        <option value="">Chọn quận/huyện</option>
                                        {districts.map(d => (
                                            <option key={d.code} value={d.code}>{d.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="input-group">
                                    <label>Phường/Xã</label>
                                    <select value={form.ward} onChange={e => setForm({ ...form, ward: e.target.value })} required>
                                        <option value="">Chọn phường/xã</option>
                                        {wards.map(w => (
                                            <option key={w.code} value={w.code}>{w.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="payment-method">
                                <label>Phương thức thanh toán</label>
                                <div className="radio">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cash"
                                        checked={form.paymentMethod === 'cash'}
                                        onChange={handleChange}
                                    />
                                    <label>Thanh toán khi nhận hàng (COD)</label>
                                </div>
                                <div className="radio">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="vnpay"
                                        checked={form.paymentMethod === 'vnpay'}
                                        onChange={handleChange}
                                    />
                                    <label>Chuyển khoản ngân hàng</label>
                                </div>
                            </div>
                        </div>

                        <div className="order-summary">
                            <h4>Tóm tắt đơn hàng</h4>
                            {orderItems.map((item, index) => (
                                <div className="summary-item" key={index}>
                                    <span>{item.title} </span>
                                    <span>{item.price.toLocaleString()} VND</span>
                                </div>
                            ))}
                            <div className="summary-total">
                                <div><span>Tạm tính</span><span>{total.toLocaleString()} VND</span></div>
                                <div><span>Phí vận chuyển</span><span>Miễn phí</span></div>
                                <div className="total"><span>Tổng cộng</span><span>{total.toLocaleString()} VND</span></div>
                            </div>
                        </div>

                        <button className="order-button">Đặt hàng</button>
                    </>
                )}

                {orderItems.length == 0 && (
                    <div className='notifying'>
                        <h2 >Nothing to booking</h2>
                    </div>
                )}
            </div>
        </form>
    );
};

export default BookingForm;
