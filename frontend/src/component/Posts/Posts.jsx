import React, { useState } from 'react';
import './Post.css'; // Import the CSS file for styling

function PostBox() {
  const [postText, setPostText] = useState('');

  const handlePostSubmit = (e) => {
    e.preventDefault();
    // Logic to handle the submitted post
    if (postText.trim()) {
      console.log('Post:', postText);
      setPostText(''); // Clear the input after posting
    }
  };

  return (
    <div className="postbox">
      <div className="postbox-header">
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="profile-pic"
        />
        <input
          type="text"
          placeholder="Start a post..."
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />
      </div>
      <div className="postbox-options">
        <button onClick={handlePostSubmit} className="postbox-button">
          Post
        </button>
        <div className="postbox-options-list">
          <div className="option">
            <img src="media-icon.png" alt="Media" />
            <span>Media</span>
          </div>
          <div className="option">
            <img src="event-icon.png" alt="Event" />
            <span>Event</span>
          </div>
          <div className="option">
            <img src="article-icon.png" alt="Write Article" />
            <span>Write Article</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostBox;
