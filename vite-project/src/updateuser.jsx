import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './updateuser.css'; // Importing the CSS file for styling

function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    // Fetch user data from server
    axios.get(`http://localhost:3000/user/${id}`)
      .then(result => {
        setName(result.data.name);
        setEmail(result.data.email);
        setAge(result.data.age);
      })
      .catch(err => {
        console.log('Error fetching data: ', err);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !age) {
      alert('Please fill in all fields');
      return;
    }

    const updatedUser = { name, email, age: parseInt(age) };

    // Send updated user data to the backend
    axios.put(`http://localhost:3000/user/${id}`, updatedUser)
      .then(result => {
        console.log('User updated:', result.data);
        navigate('/');
      })
      .catch(err => {
        console.log('Error updating user:', err);
      });
  };

  return (
    <div className="update-user-container">
      <div className="update-user-form">
        <h2>Update User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              type="number"
              id="age"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Update User
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
