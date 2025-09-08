import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LoadingComponent from '../components/common/LoadingComponent';
import Error404 from '../pages/error/Error404';
import { Provider } from 'react-redux';

const HomePage = lazy(() => import('../pages/home/HomePage'));
const ProductDetailPage = lazy(
	() => import('../pages/products/ProductDetailPage'),
);

export const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Suspense fallback={<LoadingComponent />}>
				<HomePage />
			</Suspense>
		),
	},
	{
		path: '/hextech/detail-product/:id',
		element: (
			<Suspense fallback={<LoadingComponent />}>
				<ProductDetailPage />
			</Suspense>
		),
	},
	{ path: '/hextech/*', element: <Error404 /> },
]);