import "../styles/review-section.css"
import { reviews } from './example-landing-data';


const ReviewSection = () => {
  const renderStars = (count) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < count ? 'star active' : 'star'}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <section className="review-section">
      <div className="review-container">
        <h2>Happy Couples</h2>
        <p>
          Đừng chỉ tin vào lời chúng tôi nói — hãy lắng nghe các cặp đôi đã tìm thấy mọi thứ họ cần cho ngày trọng đại hoàn hảo của mình
        </p>
        <div className="review-list">
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <div className="stars">{renderStars(review.stars)}</div>
              <p className="review-content">"{review.content}"</p>
              <div className="review-author">
                <img src={review.avatar} alt={review.name} />
                <strong>{review.name}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
