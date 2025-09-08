import { categories } from "./example-landing-data";
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import "../styles/category-section.css"

const CategorySection = () => {
  return (
    <section className="category-section">
      <Container className="text-center mb-5">
        <h2 className="section-title">Duyệt theo danh mục</h2>
        <p className="section-subtitle">
          Tìm mọi thứ bạn cần cho ngày đặc biệt của mình, từ địa điểm và nhiếp ảnh gia đến bánh và váy
        </p>
      </Container>

      <Container>
        <Row className="g-4">
          {categories.map((item, idx) => (
            <Col key={idx} md={4} sm={6}>
              <Card className="category-card text-white">
                <Card.Img src={item.image} alt={item.title} className="category-img" />
                <Card.ImgOverlay className="d-flex flex-column justify-content-end p-3">
                  <Card.Title className="fw-bold">{item.title}</Card.Title>
                  <Card.Text className="small">{item.subtitle}</Card.Text>
                </Card.ImgOverlay>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-5">
          <Button variant="danger" className="rounded-pill px-4 py-2">
            Xem tất cả các danh mục
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default CategorySection;