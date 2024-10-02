import React from 'react';
import { FaPenFancy } from 'react-icons/fa';
import './About.css'; // Assuming you're using an external CSS file

const About = () => {
  return (
    <div className="about-container">
      <FaPenFancy className="about-icon" />
      <h1 className="about-title">About Collaborative Story Creator</h1>
      <p className="about-description">
        Welcome to the Collaborative Story Creator, an engaging platform where creative minds come together to write stories, one sentence at a time! Users can collaborate in a fun and structured way to build stories, contributing just a few lines each, making it a truly unique and interactive experience. Whether you’re a storyteller or just looking for a fun pastime, this app brings people together to create something special.
      </p>
      <p className="about-description">
        Join now and be part of an ever-growing collection of creative, shared stories!
      </p>
    </div>
  );
};

export default About;
