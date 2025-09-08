export function PaymentSuccess() {
  return (
    <div className="payment-container success">
      <div className="icon">✔</div>
      <h2>Thanh toán thành công!</h2>
      <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
      <a href="/booking-history" className="btn">Xem đơn hàng</a>
    </div>
  );
}

export  function PaymentFailed() {
  return (
    <div className="payment-container failed">
      <div className="icon">✖</div>
      <h2>Thanh toán thất bại!</h2>
      <p>Giao dịch bị huỷ hoặc gặp sự cố.</p>
      <a href="/" className="btn">Quay lại trang chủ</a>
    </div>
  );
}

