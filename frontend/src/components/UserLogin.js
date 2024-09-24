import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsers} from './api'; 


const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers().then(data => setUsers(data));
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

export default UserLogin;
