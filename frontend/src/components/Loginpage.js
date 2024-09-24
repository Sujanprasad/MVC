import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Loginpage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

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
   

    const handleLogin = (e) => {
        e.preventDefault();

        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            alert("Login successful");
            navigate("/dashboard");
            setEmail("");
            setPassword("");
        } else {
            alert("Invalid email or password");
        }
    };

    return (
        <>
        <h1 align='center'>Login</h1><br />
            <form onSubmit={handleLogin}>
                <table align="center">
                    <tbody>
                        <tr>
                            <td><label>Email:</label></td>
                            <td>
                                <input 
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>Password:</label></td>
                            <td>
                                <input 
                                    type="password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                />
                            </td>
                        </tr>
                        
                    </tbody>
                </table><br />
                  <p align='center'> <button type="submit" className='btn btn-primary'>Submit</button></p>

            </form>
        </>
    );
};

export default Loginpage;
