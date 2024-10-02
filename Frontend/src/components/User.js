import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import './User.css'; // Import external CSS file for styling

const User = () => {
  const user = localStorage.getItem('userName') || 'Guest';
  const email = localStorage.getItem('email')

  return (
    <div className="user-container">
      <FaUserCircle className="user-icon" />
      <h1 className="user-name">Hi, {user}</h1>
      <h1 className="email">{email}</h1>
     { console.log(email) }
    </div>
  );
};

export default User;
