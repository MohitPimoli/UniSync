import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./LandingPage.css";
import { SlCalender } from "react-icons/sl";
import { GrGallery } from "react-icons/gr";
import { RiArticleLine } from "react-icons/ri";
import CreatePostPage from "../CreatePost/CreateNewPost"; // Import the CreatePostPage component

function Landing() {
  const [showPostForm, setShowPostForm] = useState(false); // State to toggle post form

  // Function to toggle post form
  const handlePostInputClick = () => {
    setShowPostForm(true);
  };

  return (
    <>
      <Navbar />
      {!showPostForm ? (
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
              onClick={handlePostInputClick} // Opens the post creation form on input click
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
      ) : (
        <CreatePostPage /> // Display the CreatePostPage form when input is clicked
      )}
    </>
  );
}

export default Landing;
