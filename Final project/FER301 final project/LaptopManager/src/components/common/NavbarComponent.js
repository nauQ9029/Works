import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useEffect, useState } from 'react';
import '../../App.css'
const NavBarComponent = () => {
	const accountName = localStorage.getItem('account_name');
	const username_github = localStorage.getItem('username_github');
	const [avatarUrl, setAvatarUrl] = useState('');
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (accountName && username_github) {
			axios
				.get(`https://api.github.com/users/${username_github}`, {
				})
				.then((response) => {
					console.log('GitHub API response:', response);
					setAvatarUrl(response.data.avatar_url);
					console.log('Avatar URL:', response.data.avatar_url);
				})
				.catch((error) => {
					console.error('Cannot fetch GitHub avatar', error);
					Swal.fire({
						title: 'Error',
						text: 'Cannot fetch GitHub avatar. Please try again later.',
						icon: 'error',
					});
				});
		}
	}, [accountName, username_github]);

	const handleManageClick = () => {
		if (accountName) {
			navigate('/hextech/products');
		} else {
			Swal.fire({
				title: 'Vui lòng đăng nhập để tiếp tục!',
				icon: 'question',
			}).then(() => {
				navigate('/hextech/login');
			});
		}
	};

	const activeStyle = {
		color: 'darkBlue',
		fontWeight: 'bold',
		borderBottom: '3px solid gold',
	};
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container">
					<Link className="navbar-brand" to='/'>
						<img src='/images/logo-color.png' width={120}></img>
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbar-id"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbar-id">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<div className="nav-item">
								<Link
									className="nav-link nav-link1"
									style={location.pathname === '/' ? activeStyle : {}}
									to="/"
								>
									Danh sách sản phẩm
								</Link>
							</div>
							<div className="nav-item">
								<button
									className="nav-link nav-link1"
									style={location.pathname === '/hextech/products' ? activeStyle : {}}
									onClick={handleManageClick}
								>
									Quản lý sản phẩm
								</button>
							</div>
							<div className="nav-item">
								<Link
									className="nav-link nav-link1"
									style={location.pathname === '/hextech/about' ? activeStyle : {}}
									to="/hextech/about"
								>
									Giới thiệu
								</Link>
							</div>
						</ul>
						{accountName ? (
							<div className="nav-item dropdown">
								<a
									className="nav-link dropdown-toggle"
									href="#"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									<img
										src={avatarUrl}
										alt="avatar"
										style={{
											width: '30px',
											borderRadius: '50%',
											marginRight: '5px',
										}}
									/>{' '}
									{accountName}
								</a>
								<div className="dropdown-menu p-1 mx-5">
									<div>
										<button
											onClick={() => {
												localStorage.removeItem('account_name');
												navigate('/hextech/login');
											}}
											className="dropdown-item text-center"
										>
											Đăng xuất
										</button>
									</div>
								</div>
							</div>
						) : (
							<div className="nav-item">
								<Link className="nav-link" to="/hextech/login">
									Đăng nhập
								</Link>
							</div>
						)}
					</div>
				</div>
			</nav>
		</>
	);
};

export default NavBarComponent;