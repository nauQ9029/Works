import "../styles/about-section.css"
const AboutSection = () => {
  const steps = [
    {
      icon: '🔍',
      title: 'Duyệt & Khám phá',
      desc: 'Dễ dàng tìm kiếm những thứ bạn cần',
    },
    {
      icon: '📅',
      title: 'Đặt lịch & Mua hàng',
      desc: 'Lên kế hoạch từ các chuyên gia\nSản phẩm đa dạng\nMua hàng tiện lợi',
    },
    {
      icon: '🎁',
      title: 'Tận hưởng ngày của bạn',
      desc: 'Thư giãn và tận hưởng một\nngày tuyệt vời cùng người thân\nvà bạn bè',
    },
  ];

  return (
    <section className="about-section">
      <div className="about-container">
        <h2>Nó hoạt động như thế nào</h2>
        <p>
          Lên kế hoạch cho đám cưới của bạn chưa bao giờ dễ dàng đến thế. Nền tảng của chúng tôi giúp bạn dễ dàng tìm kiếm và đặt mọi thứ bạn cần.
        </p>
        <div className="about-steps">
          {steps.map((step, index) => (
            <div key={index} className="about-step-card">
              <div className="icon-circle">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;