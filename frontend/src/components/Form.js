import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserForm = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/create/', formData)
            .then(response => {
                console.log('User created:', response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        alert("form submited successfuly!,reload page to view submited data")

    };

    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/data/')
            .then(response => {
                setUsers(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <form onSubmit={handleSubmit} className="form-table">
                <h1 align='center'>Users:-</h1>
                <table align='center' >
                    <tbody>
                        <tr>
                            <td>First Name</td>
                            <td>:-</td>
                            <td>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                           <td>:-</td>
                            <td>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
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
                       
                    </tbody>
                </table><br/>
                    <p align='center'> <button type="submit" className='btn btn-primary'>Submit</button></p>
            </form>

            <div className='container'>
                <h1>Users List</h1>
                <table className='table table-bordered border-secondary table-hover'>
                    <thead className='table-dark'>
                        <tr>
                            <th>S.No</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default UserForm;
