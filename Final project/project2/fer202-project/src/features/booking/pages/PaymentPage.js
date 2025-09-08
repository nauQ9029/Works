import React, { useEffect, useState } from "react";
import "../styles/payment.css"
import { useSearchParams } from 'react-router-dom';
import { getPayment } from "../bookingServices";

export default function PaymentPage() {


  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const totalPrice = searchParams.get("totalPrice");
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const data = await getPayment(bookingId, totalPrice);
        setBookingData(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu thanh toán:", error);
      }
    };

    if (bookingId && totalPrice) {
      fetchPayment();
    }
  }, [bookingId, totalPrice]);


  if (!bookingData) return <div className="history notify"><p>Loading...</p>;</div>

  const { booking, paymentLink } = bookingData;

  return (
    <div className="payment-container">
      <h1>Payment Details</h1>

      <div className="section">
        <p><strong>Booking ID:</strong> {booking.bookingId}</p>
        <p><strong>Status:</strong> {booking.status}</p>
        <p><strong>Total Price:</strong> <span  id="price">{booking.totalPrice.toLocaleString()} VND</span></p>
        <p><strong>Event Date:</strong> {new Date(booking.eventDate).toLocaleDateString()}</p>
        <p><strong>Created At:</strong> {new Date(booking.createdAt).toLocaleString()}</p>
        <p><strong>Note:</strong> {booking.note}</p>
      </div>

      <div className="section">
        <h2>Receiver Information</h2>
        <p><strong>Name:</strong> {booking.receiverName}</p>
        <p><strong>Phone:</strong> {booking.receiverPhone}</p>
        <p><strong>Address:</strong> {booking.receiverAddress}</p>
      </div>

      <a
        href={paymentLink}
        target="_blank"
        rel="noopener noreferrer"
        className="payment-button"
      >
        Proceed to Payment
      </a>
    </div>

  );
}
