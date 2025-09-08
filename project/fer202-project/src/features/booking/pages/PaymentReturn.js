import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PaymentFailed, PaymentSuccess } from "./PaymentNotification";
import { fetchBookingDetail } from "../../admin/manage-booking/bookingServices";
import { changePaymentStatus } from "../bookingServices";

export default function PaymentReturn() {
  const [searchParams] = useSearchParams();
  const [latestPaymentId, setLatestPaymentId] = useState(null);

  useEffect(() => {
    const orderInfo = searchParams.get("vnp_OrderInfo"); 
    if (!orderInfo || !orderInfo.startsWith("booking_")) return;

    const bookingId = parseInt(orderInfo.split("_")[1]);

    const getBooking = async () => {
      try {
        const data = await fetchBookingDetail(bookingId);

        if (data.payments && data.payments.length > 0) {
            
          
          setLatestPaymentId(data.payments[data.payments.length-1].paymentId);
          console.log(latestPaymentId)
          changePaymentStatus(data.payments[data.payments.length-1].paymentId, "paid")
        }
      } catch (err) {
        console.error("Lỗi khi fetch booking:", err);
      }
    };

    getBooking();
  }, [searchParams]);

  const responseCode = searchParams.get("vnp_ResponseCode");
  return (
    <>
      {responseCode === "00" ? <PaymentSuccess /> : <PaymentFailed />}
    </>
  )
}
