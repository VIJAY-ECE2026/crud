import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './User.css'; // Import the custom CSS file

function User() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users from the server
        axios.get('http://localhost:3000') // Ensure the server is running and accessible
            .then(result => setUsers(result.data)) // Set the fetched data correctly
            .catch(err => console.log('Error fetching data: ', err));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/deleteuser/${id}`)
            .then(res => {
                console.log(res);
                // Remove the deleted user from the state
                setUsers(users.filter(user => user._id !== id));
            })
            .catch(err => console.log('Error deleting user:', err));
    };

    return (
        <div className='user-container'>
            <div className='user-header'>
                <Link to="/create" className='btn btn-create'>Create User</Link>
                <h2>User List</h2>
            </div>
            <div className='table-container'>
                <table className='user-table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
    {users.map((user, index) => {
        return (
            <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                    <Link to={`/update/${user._id}`} className='btn btn-edit'>Edit</Link>
                    <button className='btn btn-delete' onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
            </tr>
        );
    })}
</tbody>

                </table>
            </div>
        </div>
    );
}

export default User;
