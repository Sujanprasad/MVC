import React, { useState } from 'react';
import { createUsers } from './api';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        user_name: '',
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

        const response = await createUsers(formData);
        console.log(response)

        setErrors(response);

    };

    const goToLogin = () => {
        navigate('/login');
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="form-table">
                <h1 align='center'>Register</h1>
                <table align='center'>
                    <tbody>
                        {/* Username Field */}
                        <tr>
                            <td>Username</td>
                            <td>:-</td>
                            <td>
                                <input
                                    type="text"
                                    name="user_name"
                                    value={formData.user_name}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.username_error && errors.username_error.map((msg, index) => (
                                    <p key={index} style={{ color: 'red' }}>{msg}</p>
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
                                {errors.email_error && errors.email_error.map((msg, index) => (
                                    <p key={index} style={{ color: 'red' }}>{msg}</p>
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
                                {/* Display all password errors */}
                                {errors.password_error && errors.password_error.map((msg, index) => (
                                    <p key={index} style={{ color: 'red' }}>{msg}</p>
                                ))}
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
                            </td>
                        </tr>
                        {/* General Errors */}
                        {errors.general && (
                            <tr>
                                <td colSpan="3">
                                    <p style={{ color: 'red' }}>{errors.general}</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table><br />
                <p align='center'>
                    <button type="submit" className='btn btn-primary'>Submit</button>
                </p>
            </form>
            <hr />
            <br />
            <p align='right' className='container'>
                Go to
                <button className='btn btn-primary' onClick={goToLogin}>login page</button>
            </p>
        </>
    );
};

export default RegistrationForm;
