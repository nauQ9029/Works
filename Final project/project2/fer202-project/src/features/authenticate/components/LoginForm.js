import { useDispatch, useSelector } from "react-redux";
import { login } from "../authThunk";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../auth-style/login.css"
// import "themify-icons/themify-icons.css"

export default function LoginForm() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error)
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    setSubmitted("true")
  };

  useEffect(() => {
    if (!submitted) return;
    console.log("status: " + status)
    if (status === "succeeded") {
      switch (user.role) {
        case 'vendor':
          navigate('/vendor/dashboard');
          break;
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'user':
          navigate('/');
          break;
        default:
          navigate('/');
      }
    } else if (status === "failed") {
      console.log(error)
      if (error === 401) alert("Wrong login information");
      else if (error === 404) alert("Account does not exist");
      else alert("Error happened");
    }
  }, [status]);

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleLogin}>
        <h3><span>Hat</span> De</h3>
        <h2>Đăng nhập để đặt hàng</h2>
        <h6>Vui lòng đăng nhập tài khoản của bạn</h6>

        <div className="form-group">
          <label htmlFor="email">Địa chỉ Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Nhập địa chỉ email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mật khẩu</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Nhập mật khẩu"
          />
        </div>

        <div className="checkbox-row">
          <label>
            <input type="checkbox" />
            Ghi nhớ mật khẩu
          </label>
          <a href="#">Quên mật khẩu?</a>
        </div>

        <button type="submit" className=" login-btn"
          onSubmit={() => handleLogin}
        >Đăng nhập</button>

        <div className="divider">Hoặc tiếp tục với</div>

        <div className="social-login">
          <button><img src="https://img.icons8.com/color/24/000000/google-logo.png" alt="Google" /></button>
          <button><img src="https://img.icons8.com/color/24/000000/facebook-new.png" alt="Facebook" /></button>
          <button><img src="https://img.icons8.com/color/24/000000/twitter--v1.png" alt="Twitter" /></button>
        </div>

        <div className="login-footer">
          Bạn chưa có tài khoản? <a href="./register">Đăng ký ngay</a>
        </div>
      </form>
    </div>
  );
};


