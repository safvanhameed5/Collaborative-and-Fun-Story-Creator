import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './CreateStory.css'; // Make sure to create this CSS file

const CreateStoryComponent = () => {
  const data = {
    title: "",
    content: "",
    created_by: "", 
  };

  const navigate = useNavigate();

  const [story, setStory] = useState(data);

  const goBack = () => {
    navigate('/story')
  }

  // Update state when input changes
  const handleInput = (e) => {
    setStory({ ...story, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:8000/stories/", story)
      .then((response) => {
        alert("New Story Created");
        navigate('/story'); // Navigate to the stories list
      })
      .catch((err) => {
        console.error("Error creating story:", err);
      });
  };

  return (
    <div className="container-dev">
      <h2>Create Story</h2>
      <form onSubmit={handleSubmit}>
        <label className="form-label">Title</label>
        <input
          type="text"
          placeholder="Story Title"
          name="title"
          className="form-control"
          value={story.title}
          onChange={handleInput}
          required
        />

        <label className="form-label">Content</label>
        <textarea
          placeholder="Story Content"
          name="content"
          className="form-control"
          value={story.content}
          onChange={handleInput}
          required
        />

        <label className="form-label">Created By (User ID)</label>
        <input
          type="number"
          placeholder="User ID"
          name="created_by"
          className="form-control"
          value={story.created_by}
          onChange={handleInput}
          required
        />

        <div>
          <button className="btn btn-success" type="submit">
            Save
          </button>
          <button onClick={()=>goBack()} className="btn btn-danger" id="back">
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateStoryComponent;
