import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import singup from "../Images/singup.jpg";
import "./Singnup.css";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};
    let isValid = true;

    if (!username.trim()) {
      newErrors.username = "Please enter your username.";
      isValid = false;
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Please enter your password.";
      isValid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      try {
        const response = await fetch("http://localhost:5000/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        });
        const data = await response.json();

        if (response.ok) {
          alert(data.message);
          navigate("/Login");
        } else {
          setErrors(data.errors || {});
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
      }
    }
  };

  return (
    <div className="img-background">
      <div className="bg-container">
        <h2 className="text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="formg">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
            <div className="invalid-feedback">{errors.username}</div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
            <div className="invalid-feedback">{errors.email}</div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
            <div className="invalid-feedback">{errors.password}</div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" style={{marginLeft:"35px"}}>Confirm Password</label>
            <input
              type="password"
              className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
            <div className="invalid-feedback">{errors.confirmPassword}</div>
          </div>

          <button type="submit" className="btn">
            Sign up
          </button>
        </form>

        <div className="text-center mt-3">
          <p>
            Already have an account? <NavLink to="/Login">Login</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

