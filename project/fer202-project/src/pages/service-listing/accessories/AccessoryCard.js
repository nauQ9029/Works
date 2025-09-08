import "../styles/accessory-card.css"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../features/manage-cart/cartSlice";
function AccessoryCard({ item }) {
  const dispatch = useDispatch();

  const handleAddToCart = (e, item) => {
    e.preventDefault();
    alert("Added to cart! ")
    dispatch(addToCart(item));
  };
  return (
    <Link to={`/service-detail/${item.serviceId}`} className="folder-link">
  <div className="decor-card">
    <div className="card-image">
      <img src={item.imageDemo} alt={item.title} />
      <div className="card-icons">
        <i className="bi bi-heart"></i>
        <i onClick = {(e)=>{handleAddToCart(e, item)}}className="bi bi-cart"></i>
      </div>
    </div>
    <div className="card-content">
      <p className="category">Trang sức</p> 
      <h4>{item.title}</h4>
      <div className="card-footer">
        <span className="price">{item.price.toLocaleString()}₫</span>
      </div>
    </div>
  </div>
  </Link>
);
}
export default AccessoryCard;