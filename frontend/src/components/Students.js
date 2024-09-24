import React, { useEffect, useState } from 'react';
import { fetchStudents} from './api';

const UserForm = () => {

    const [users, setUsers] = useState([]);
    
    useEffect(() => {
    fetchStudents()
        .then(data => setUsers(data))
        .catch(error => console.error('Error loading students:', error));
}, []);


    return (
        <>
           
            <div className='container'>
                <h1>Students List</h1>
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
