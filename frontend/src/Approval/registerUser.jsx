import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterUser= () => {
    const [formData, setFormData] = useState({
        name: '',
        phone:'',
        email: '',
        password: '',
        confirm_password: ''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          "http://localhost:8000/api/Register-user/",
          formData
        );
        console.log(response.data);
        setTimeout(() => {
          navigate("/user-dashboard");
        }, 2000);
        navigate("/user-login");
      } catch (error) {
        if (error.response && error.response.data) {
          setErrors(error.response.data);
        } else {
          setErrors({ general: "Something went wrong. Please try again." });
        }
        console.error("There was an error!", error);
      }
    };

    const goToLogin=()=>{
        navigate('/user-login')
    }

    const goToAdmin = () => {
      navigate("/admin-login");
    };


    return (
      <>
        <form onSubmit={handleSubmit} className="form-table">
          <h1 align="center">User Registration</h1>
          <br />
          <table align="center">
            <tbody>
              {/* Username Field */}
              <tr>
                <td>User name</td>
                <td>:-</td>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  {errors.name_error &&
                    errors.name_error.map((msg, index) => (
                      <p key={index} style={{ color: "red" }}>
                        {msg}
                      </p>
                    ))}
                </td>
              </tr>
              {/* Phone Field */}
              <tr>
                <td>Phone</td>
                <td>:-</td>
                <td>
                  <input
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
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
        <p align="right" className="container">
          Go to
          <button className="btn btn-primary" onClick={goToLogin}>
           user login page
          </button>
        </p>
        <p align="right" className="container">
          Go to
          <button className="btn btn-primary" onClick={goToAdmin}>
            Admin login page
          </button>
        </p>
      </>
    );
};

export default RegisterUser;
