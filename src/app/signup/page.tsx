"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "../../styles/signup.css";

export default function SignupPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup Form Data:", form);
  };

  return (
    <div className="signup-container flex items-center justify-center min-h-screen px-6">
      <form onSubmit={handleSubmit} className="signup-card">
        <h1 className="signup-title">Create Your Account</h1>

        {/* First Name */}
        <div className="signup-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter first name"
            value={form.firstName}
            onChange={handleChange}
          />
        </div>

        {/* Last Name */}
        <div className="signup-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter last name"
            value={form.lastName}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="signup-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="signup-group">
          <label>Password</label>

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
            />

            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="eye-icon" />
              ) : (
                <Eye className="eye-icon" />
              )}
            </span>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="signup-group">
          <label>Confirm Password</label>

          <div className="password-wrapper">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={handleChange}
            />

            <span
              className="password-toggle"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? (
                <EyeOff className="eye-icon" />
              ) : (
                <Eye className="eye-icon" />
              )}
            </span>
          </div>
        </div>

        {/* Submit */}
        <button type="submit" className="signup-btn">
          Sign Up
        </button>
      </form>
    </div>
  );
}
