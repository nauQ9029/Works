import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductDetailForm = (props) => {
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:3001/products/${props.id}`)
            .then((response) => {
                setProduct(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });
    }, [props.id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
    };

    const calculateDiscount = (price, currentPrice) => {
        return ((1 - currentPrice / price) * 100).toFixed(0);
    };
    console.log(product.image);
    return (
        <div className="container-fluid d-flex flex-column align-items-center justify-content-center mt-4">
            <h6 className="display-6 mb-4 text-center">Thông tin sản phẩm</h6>
            <div className="container-fluid mt-5 w-75 shadow-lg py-5">
                <div className="row">
                    <div className="d-flex flex-column align-items-center justify-content-center col-lg-6 col-md-12">
                        <img
                            src={product.image}
                            alt="Product"
                            className="img-fluid"
                            style={{ width: '100%', height: '500px' }}
                        />
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <p className="mb-4 text-start h4">
                            <strong>{product.name}</strong>
                        </p>
                        <p className="mb-3 mt-4 h5" style={{ whiteSpace: 'nowrap' }}>
                            Giá gốc:{' '}
                            <span
                                style={{
                                    textDecoration:
                                        product.currentPrice < product.price
                                            ? 'line-through'
                                            : 'none',
                                }}
                            >
                                {formatPrice(product.price)}
                            </span>
                        </p>
                        <p
                            className="h5 mt-4"
                            style={{ color: 'red', whiteSpace: 'nowrap' }}
                        >
                            Giá ưu đãi: {formatPrice(product.currentPrice)}{' '}
                            <button
                                disabled
                                className="btn btn-secondary ml-5 p-1"
                                style={{
                                    color: 'red',
                                    fontWeight: 'bold',
                                    backgroundColor: '#f9d7d7',
                                    marginLeft: '10px',
                                }}
                            >
                                Giảm tới{' '}
                                {calculateDiscount(product.price, product.currentPrice)}%
                            </button>
                        </p>
                        <p className="h5 d-flex flex-column align-items-left mt-4 mb-3">
                            Mô tả sản phẩm:
                        </p>
                        <p className="h5 d-flex flex-column align-items-center mb-3">
                            {product.description}
                        </p>
                        <button
                            onClick={() => navigate(-1)}
                            className="btn btn-primary float-right w-100 mt-5"
                        >
                            Quay lại
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailForm;
