import React from 'react';
import { FaEnvelope, FaUser } from 'react-icons/fa';
import './Contact.css'; // Assuming you're using an external CSS file

const Contact = () => {
  return (
    <div className="contact-container">
      <FaUser className="contact-icon" />
      <h1 className="contact-title">Contact Safvan Hameed</h1>
      <p className="contact-description">
        Feel free to reach out for any inquiries or collaborations. I am always open to connecting with fellow developers and creatives!
      </p>
      <div className="contact-info">
        <FaEnvelope className="email-icon" />
        <span className="contact-email">safvanhameed5@gmail.com</span>
      </div>
    </div>
  );
};

export default Contact;
