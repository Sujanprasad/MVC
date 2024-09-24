import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminRegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/Admincreation/",
        formData
      );
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        setErrors({ general: "Something went wrong. Please try again." });
      }
      console.error("There was an error!", error);
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  
  const goto_User_register= () => {
    navigate("/user");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-table">
        <h1 align="center">Admin Registration</h1>
        <br />
        <table align="center">
          <tbody>
            {/* Username Field */}
            <tr>
              <td>Username</td>
              <td>:-</td>
              <td>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                {errors.username_error &&
                  errors.username_error.map((msg, index) => (
                    <p key={index} style={{ color: "red" }}>
                      {msg}
                    </p>
                  ))}
              </td>
            </tr>
            {/* Email Field */}
            <tr>
              <td>Email</td>
              <td>:-</td>
              <td>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email_error &&
                  errors.email_error.map((msg, index) => (
                    <p key={index} style={{ color: "red" }}>
                      {msg}
                    </p>
                  ))}
              </td>
            </tr>
            {/* Password Field */}
            <tr>
              <td>Password</td>
              <td>:-</td>
              <td>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            {/* Confirm Password Field */}
            <tr>
              <td>Confirm Password</td>
              <td>:-</td>
              <td>
                <input
                  type="password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  required
                />

                {/* Display all password errors */}
                {errors.password_error &&
                  errors.password_error.map((msg, index) => (
                    <p key={index} style={{ color: "red" }}>
                      {msg}
                    </p>
                  ))}
              </td>
            </tr>
            {/* General Errors */}
            {errors.general && (
              <tr>
                <td colSpan="3">
                  <p style={{ color: "red" }}>{errors.general}</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <br />
        <p align="center">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </p>
      </form>
      <hr />
      <br />
      <div>
      <p align="right" className="container">
        Go to
        <button className="btn btn-primary" onClick={goToLogin}>
          login page
        </button>
      </p>
      <p align="left" className="container">
        Go to <button className="btn btn-primary" onClick={goto_User_register}>
           User registration page
        </button>
      </p>
      </div>
    </>
  );
};

export default AdminRegistrationForm;
