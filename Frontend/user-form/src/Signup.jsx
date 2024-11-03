import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContactServices } from './ContactServices';
import { Link } from 'react-router-dom'

const Signup = () => {
  const [user, setUser] = useState({ name: '', dateofbirth: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await ContactServices.createContact(user);
      alert('Signup successful! Please login.');
      navigate('/login');
    } catch (error) {
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="container p-3">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          type="text"
          name="dateofbirth"
          placeholder="Date of Birth"
          value={user.dateofbirth}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <div className="d-flex justify-content-between align-items-center">
          <button type="submit" className="btn btn-success">Signup</button>
          <Link to={'/'} className="btn btn-warning">Back</Link>
        </div>

      </form>
    </div>
  );
};

export default Signup;
