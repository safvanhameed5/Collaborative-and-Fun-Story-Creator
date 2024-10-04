import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './StoryList.css';
import { useNavigate } from "react-router-dom"; // Import the CSS file

const StoryList = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetchStories();
  }, []);

  const navigate = useNavigate();

  const viewStory = (id) => {
    navigate("/view/" + id);
  };

  const createStory = () => {
    navigate("/create"); // Navigate to the create story page
  };

  const fetchStories = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/stories/');
      console.log(response.data);
      setStories(response.data);
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="title"><i>Collaborative Story Maker</i></h1>
      <button onClick={createStory} className="create-story-button">Create Story</button>
      <div className='stretch'>
      {stories.length > 0 ? (
        stories.map((story) => (
          <div key={story.id} onClick={() => viewStory(story.id)} className="story-card">
            <h2 className="story-title">{story.title}</h2>
            <p className="story-content"><i>
              {story.content.length > 100
                ? story.content.substring(0, 100) + '...'
                : story.content}
            </i></p>
            <p className="story-details">Author: User {story.author_username}</p>
            <p className={story.completed ? 'completed' : 'ongoing'}>
              Status: {story.completed ? 'Completed' : 'Ongoing'}
            </p>
          </div>
        ))
      ) : (
        <p className="no-stories">No stories available.</p>
      )}
      </div>
    </div>
  );
};

export default StoryList;
