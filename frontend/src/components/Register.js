import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        user_name: '',
        email: '',
        password:''
    });

    const navgate=useNavigate();

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/')
            .then(response => {
                setUsers(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const [Confirmpassword,setConfirmpassword]=useState('')


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const match=users.find(user => user.email === formData.email||user.user_name===formData.user_name)

        if (match) {
            alert('Username or Email already exists');
            return;
        }

        if (formData.password !== Confirmpassword) {
            alert('Passwords does not match');
            return;
        }

        axios.post('http://localhost:8000/api/Register/', formData)
            .then(response => {
                console.log('User created:', response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        alert("form submited successfuly!,click ok to redirect to login page")

        navgate('/login');


    };

    const gotologin=()=>{
        navgate('login')
    }


    return (
        <>
            <form onSubmit={handleSubmit} className="form-table">
                <h1 align='center'>Register:-</h1>
                <table align='center' >
                    <tbody>
                        <tr>
                            <td>User Name</td>
                            <td>:-</td>
                            <td>
                                <input
                                    type="text"
                                    name="user_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    required
                                />
                            </td>
                        </tr>
                        
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
                            </td>
                        </tr>
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
                        <tr>
                            <td>Confirm Password</td>
                             <td>:-</td>
                            <td>
                                <input
                                    type="password"
                                    name="Confirmpassword"
                                    value={Confirmpassword}
                                    onChange={(e) => setConfirmpassword(e.target.value)} 
                                    required
                                />
                            </td>
                        </tr>
                    </tbody>
                </table><br/>
                    <p align='center'> <button type="submit" className='btn btn-primary'>Submit</button></p>
            </form>
            <hr />
            <br />
            <p align='right' className='container'>go to <button className='btn btn-primary' onClick={gotologin}>login page</button></p>
        </>
    );
};

export default RegistrationForm;
