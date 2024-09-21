import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import CreatePostPage from "../CreatePost/CreateNewPost"; // Import the CreatePostPage component
import "./LandingPage.css";

import { SlCalender } from "react-icons/sl";
import { GrGallery } from "react-icons/gr";
import { RiArticleLine } from "react-icons/ri";

function Landing() {
  const [showPostForm, setShowPostForm] = useState(false);

  // Function to open/close the post modal
  const handlePostInputClick = () => {
    setShowPostForm(true);
  };

  const handleClosePostForm = () => {
    setShowPostForm(false);
  };

  return (
    <>
      <Navbar />
      <div className="post-container">
        <div className="post-header">
          <img
            src="https://i.postimg.cc/mDwYKVVF/yash.jpg" /* Replace with your profile image URL */
            alt="Profile"
            className="profile-pic"
          />
          <input
            type="text"
            className="post-input"
            placeholder="Start a post, try writing with AI"
            onClick={handlePostInputClick} // Opens the post modal
          />
        </div>
        <div className="post-actions">
          <div className="action-item">
            <GrGallery />
            <span>Media</span>
          </div>
          <div className="action-item">
            <SlCalender />
            <span>Event</span>
          </div>
          <div className="action-item">
            <RiArticleLine />
            <span>Write article</span>
          </div>
        </div>
      </div>

      {showPostForm && (
        <CreatePostPage closePost={handleClosePostForm} /> // Show modal when user clicks the input box
      )}
    </>
  );
}

export default Landing;






