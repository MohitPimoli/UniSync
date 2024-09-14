import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./LandingPage.css";
import { SlCalender } from "react-icons/sl";
import { GrGallery } from "react-icons/gr";
import { RiArticleLine } from "react-icons/ri";

function Landing() {
  const [showModal, setShowModal] = useState(false); // State to toggle modal

  // Function to handle opening and closing the modal
  const toggleModal = () => {
    setShowModal(!showModal);
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
          />
        </div>
        <div className="post-actions">
          <div className="action-item" onClick={toggleModal}>
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

      {/* Modal for Image Upload */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Upload Media</h2>
            <input type="file" accept="image/*" />
            <button onClick={toggleModal} className="-btn">
              Close
            </button>
            <button onClick={toggleModal} className="-btn">
              Upload
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Landing;
