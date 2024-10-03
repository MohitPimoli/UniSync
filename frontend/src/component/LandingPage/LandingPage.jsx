import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import CreatePostPage from "../CreatePost/CreateNewPost"; // Import the CreatePostPage component
import QueryPage from "../CreateQuery/GenerateQuere"; // Import the QueryPage component
import "./LandingPage.css";

import { MdOutlineQuestionMark } from "react-icons/md";
import { GrGallery } from "react-icons/gr";
import { FaCode } from "react-icons/fa6";

function Landing() {
  const [showPostForm, setShowPostForm] = useState(false);
  const [showQueryForm, setShowQueryForm] = useState(false); // New state for Query form

  // Function to open/close the post modal
  const handlePostInputClick = () => {
    setShowPostForm(true);
  };

  const handleClosePostForm = () => {
    setShowPostForm(false);
  };

  // Function to open/close the query modal
  const handleQueryClick = () => {
    setShowQueryForm(true);
  };

  const handleCloseQueryForm = () => {
    setShowQueryForm(false);
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
          <div className="action-item" onClick={handleQueryClick}> {/* Open the Query modal */}
            <MdOutlineQuestionMark />
            <span>Query</span>
          </div>
          <div className="action-item">
            <FaCode />
            <span>Write article</span>
          </div>
        </div>
      </div>

      {/* Show CreatePostPage when user clicks on the input */}
      {showPostForm && (
        <CreatePostPage closePost={handleClosePostForm} /> // Show modal when user clicks the input box
      )}

      {/* Show QueryPage when user clicks on the Query button */}
      {showQueryForm && (
        <QueryPage closeQuery={handleCloseQueryForm} /> // Show modal for queries
      )}
    </>
  );
}

export default Landing;
