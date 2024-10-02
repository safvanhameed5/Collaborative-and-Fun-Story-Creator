// src/pages/Register.js
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../../services/axiosConfig'; // Axios instance
import './Register.css'; // Styling

const Register = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await apiClient.post('/register/', {
        username,
        email,
        password,
      });

      localStorage.setItem('email', response.data.email);

      alert('Registration successful');
      navigate('/');
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError(err.response.data.error || 'Registration failed');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button className='register' type="submit">Register</button>
      </form>
      <p className="register-link">
        Already User? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default Register;
