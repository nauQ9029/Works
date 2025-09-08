import React, { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';

const NavBarComponent = lazy(
    () => import('../../components/common/NavbarComponent'),
);
const ProductDetailForm = lazy(
    () => import('../../components/product/ProductDetailForm'),
);

const ProductDetailPage = () => {
    const params = useParams();
    return (
        <div className="vh-100">
            <Suspense fallback={<div>Loading...</div>}>
                <NavBarComponent />
                <ProductDetailForm id={String(params.id)} />
            </Suspense>
        </div>
    );
};

export default ProductDetailPage;
