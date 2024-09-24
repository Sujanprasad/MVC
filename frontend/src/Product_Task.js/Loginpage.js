import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const admin_base_url = "http://127.0.0.1:8000/api/";

const UserLoginPage = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const loginUser = async (event) => {
    event.preventDefault();
    setMessage("");

    const auth_user = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    try {
      const response = await axios.post(
        admin_base_url + "Productlogin/",
        auth_user,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response) {
        setMessage("Login successful, redirecting to verify otp page check your email for OTP.");

        localStorage.clear();
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);

        setTimeout(() => {
          navigate("/verify", {
            state: {
              username: response.data.username,
              usertype: response.data.usertype,
            },
          });
        }, 2000);
      }
    } catch (error) {
      setMessage("Login details are invalid");
    }
  };

  const goToadminRegistration = () => {
    navigate("/admin-register");
  };
  const goTouserRegistration = () => {
    navigate("/user-register");
  };

  return (
    <div className="container">
      <h2 align="center">Login</h2>
      <br />
      <form onSubmit={loginUser}>
        <table align="center">
          <tbody>
            <tr>
              <td>
                <label>Email:</label>
              </td>
              <td>
                <input type="email" id="email" name="email" required />
              </td>
            </tr>
            <tr>
              <td>
                <label>Password:</label>
              </td>
              <td>
                <input type="password" id="password" name="password" required />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <p align="center">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </p>
      </form>
      <p align="center">{message && <p>{message}</p>}</p>

      <hr />
      <br />
      <p align="right" className="container">
        Go to
        <button className="btn btn-primary" onClick={goTouserRegistration}>
          User Registration page
        </button>
      </p>
      <p align="right" className="container">
        Go to
        <button className="btn btn-primary" onClick={goToadminRegistration}>
          Admin Registration page
        </button>
      </p>
    </div>
  );
};

export default UserLoginPage;
