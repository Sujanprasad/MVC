import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const admin_base_url = "http://127.0.0.1:8000/api/";

function VerifyOTP() {
  const [otp, setotp] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const navigate = useNavigate();
  const location = useLocation();
  const { username, usertype } = location.state || {};

  useEffect(() => {
    if (timeLeft === 0) {
      alert("Time expired. Please request a new OTP.");
      navigate("/login");
      return;
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, navigate]);

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (!username || !usertype) {
      alert("Invalid session. Please login again.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        admin_base_url + "verify-otp/",
        {
          username: username,
          otp: otp,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        if (usertype === "user") {
          navigate("/user_dashboard");
        } else {
          navigate("/admin_dashboard");
        }
      } else {
        alert("Invalid OTP");
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        alert("Invalid OTP");
      }
    }
  };

  return (
    <>
      <form onSubmit={handlesubmit}>
        <h1 align="center">Verify OTP</h1>
        <br />
        <p align="center">
          <input
            type="text"
            value={otp}
            onChange={(e) => setotp(e.target.value)}
            required
          />
        </p>
        <p align="center">Time remaining: {timeLeft} seconds</p>

        <p align="center">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={timeLeft === 0}
          >
            Verify
          </button>
        </p>
      </form>
    </>
  );
}

export default VerifyOTP;
