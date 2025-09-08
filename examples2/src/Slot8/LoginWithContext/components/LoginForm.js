import React, { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import { Form, Button } from "react-bootstrap";
import "../../../App.css"; // Import the CSS

const LoginForm = () => {
  const { login, user } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else {
      if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      } else {
        // Regex to check conditions
        const uppercase = /[A-Z]/;
        const lowercase = /[a-z]/;
        const number = /[0-9]/;
        const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

        if (!uppercase.test(password))
          newErrors.password =
            "Password must contain at least one uppercase letter";
        else if (!lowercase.test(password))
          newErrors.password =
            "Password must contain at least one lowercase letter";
        else if (!number.test(password))
          newErrors.password = "Password must contain at least one number";
        else if (!specialChar.test(password))
          newErrors.password =
            "Password must contain at least one special character";
      }
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      login(name, email); // optionally pass password too if storing it
      setErrors({});
    }
  };

  if (user) return null;

  return (
    <div className="app-background">
      <div className="glass-card">
        <h3 className="mb-4 text-center">Login</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              isInvalid={!!errors.name}
              placeholder="Enter your name"
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!errors.email}
              placeholder="Enter your email"
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!errors.password}
              placeholder="Enter your password"
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="light" className="w-100">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
