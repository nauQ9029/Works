import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { register } from "../authThunk";
import { useNavigate } from "react-router-dom";
import "../auth-style/register.css";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);

  // State cho các trường trong form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState('');
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState('');
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("user");
  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [mst, setMst] = useState("");

  const validatePassword = (pwd) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!regex.test(pwd)) {
      setPasswordError("Mật khẩu phải có ít nhất 6 ký tự, 1 chữ hoa và 1 số.");
    } else {
      setPasswordError('');
    }
  };

  const validatePhone = (value) => {
    const regex = /^(0\d{9,10})$/;
    if (!regex.test(value)) {
      setPhoneError("Số điện thoại không hợp lệ. Phải bắt đầu bằng 0 và có 10–11 số.");
    } else {
      setPhoneError('');
    }
  };


  const handleRegister = async (e) => {
    e.preventDefault();

    const fullname = `${firstName} ${lastName}`;
    const formData = {
      fullname,
      email,
      password,
      phone,
      address,
      role,
      businessName: role === "vendor" ? businessName : "",
      description: role === "vendor" ? description : "",
      mst: role === "vendor" ? mst : ""
    };

    dispatch(register(formData));
    setSubmitted(true);
  };

  useEffect(() => {
    if (!submitted) return;

    if (status === "succeeded") {
      alert("Đăng ký thành công! Đăng nhập để tiếp tục.");
      navigate("/login");
    } else if (status === "failed") {
      alert("Đăng ký thất bại: " + (error || "Lỗi không xác định"));
    }
  }, [status]);

  return (
    <div className="register-wrapper">
      <form className="register-form" onSubmit={handleRegister}>
        <h3><span>Hat</span> De</h3>
        <h2>Tạo tài khoản</h2>
        <h6>Tham gia cộng đồng dịch vụ tiệc cưới</h6>

        <div className="role-toggle">
          <button type="button" className={role === 'user' ? 'active' : ''} onClick={() => setRole('user')}>
            <i className="fas fa-user"></i> Người dùng
          </button>
          <button type="button" className={role === 'vendor' ? 'active' : ''} onClick={() => setRole('vendor')}>
            <i className="fas fa-gift"></i> Người bán
          </button>
        </div>

        <div className="name-fields">
          <input type="text" placeholder="Họ" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input type="text" placeholder="Tên" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>

        <div className="input-icon">
          <i className="fas fa-envelope"></i>
          <input type="email" placeholder="Địa chỉ Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="input-icon">
          <i className="fas fa-phone"></i>
          <input
            type="text"
            placeholder="Số điện thoại"
            required
            value={phone}
            onChange={(e) => {
              const value = e.target.value;
              setPhone(value);
              validatePhone(value);
            }}
          />
        </div>
        {phoneError && <p className="error-text">{phoneError}</p>}


        <div className="input-icon">
          <i className="fas fa-map-marker-alt"></i>
          <input type="text" placeholder="Địa chỉ" required value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>

        {role === 'vendor' && (
          <>
            <div className="input-icon">
              <i className="fas fa-building"></i>
              <input type="text" placeholder="Tên doanh nghiệp" required value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
            </div>

            <div className="input-icon">
              <i className="fas fa-list"></i>
              <input type="text" placeholder="Mô tả doanh nghiệp" required value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            <div className="input-icon">
              <i className="fas fa-id-card"></i>
              <input type="text" placeholder="Mã số doanh nghiệp" required value={mst} onChange={(e) => setMst(e.target.value)} />
            </div>
          </>
        )}

        <div className="input-icon">
          <i className="fas fa-lock"></i>
          <input
            type="password"
            placeholder="Mật khẩu"
            required
            value={password}
            onChange={(e) => {
              const pwd = e.target.value;
              setPassword(pwd);
              validatePassword(pwd);
            }}
          />
        </div>
        {passwordError && <p className="error-text">{passwordError}</p>}


        <div className="checkbox-row">
          <label>
            <input type="checkbox" required /> Tôi đồng ý với{' '}
            <a href="#">Điều khoản dịch vụ</a> và{' '}
            <a href="#">Chính sách bảo mật</a>
          </label>
        </div>

        <button type="submit" className="btn-primary">
          Tạo tài khoản
        </button>

        <div className="divider">Hoặc tiếp tục với</div>

        <div className="social-login">
          <button><img src="https://img.icons8.com/color/24/google-logo.png" alt="Google" /></button>
          <button><img src="https://img.icons8.com/color/24/facebook-new.png" alt="Facebook" /></button>
          <button><img src="https://img.icons8.com/color/24/twitter--v1.png" alt="Twitter" /></button>
        </div>

        <div className="login-footer">
          Đã có sẵn tài khoản? <a href="./login">Đăng nhập</a>
        </div>
      </form>
    </div>
  );
}
