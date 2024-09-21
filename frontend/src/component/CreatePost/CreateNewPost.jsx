import React, { useState, useRef } from "react";
import "./CreateNewPost.css";
import { SlCalender } from "react-icons/sl";
import { GrGallery } from "react-icons/gr";
import { RiArticleLine } from "react-icons/ri";

const CreatePostPage = ({ closePost }) => {
  const [postText, setPostText] = useState("");
  const [mediaFile, setMediaFile] = useState(null); // State to store the selected media file
  const fileInputRef = useRef(null); // Ref to trigger the file input programmatically

  // Handle text change in the post textarea
  const handlePostChange = (e) => {
    setPostText(e.target.value);
  };

  // Handle post submit
  const handlePostSubmit = () => {
    // Submit post logic (include media if any)
    console.log("Post submitted:", postText, mediaFile);
    closePost(); // Close the modal after submitting the post
  };

  // Trigger file input when "Media" is clicked
  const handleMediaClick = () => {
    fileInputRef.current.click(); // Open the file dialog
  };

  // Handle file change when user selects media
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setMediaFile(file);
    }
  };

  return (
    <div className="create-post-overlay">
      <div className="create-post-modal">
        <div className="create-post-header">
          <h2>Create a Post</h2>
          <button onClick={closePost} className="close-btn">
            ✕
          </button>
        </div>
        <div className="create-post-content">
          <div className="user-info">
            <img
              src="https://i.postimg.cc/mDwYKVVF/yash.jpg" /* Profile image URL */
              alt="User"
              className="profile-pic-modal"
            />
            <div className="user-details">
              <p className="username">Name of User</p>
              
            </div>
            <p className="visibility">Public</p>
          </div>
          <textarea
            className="post-textarea"
            placeholder="What do you want to talk about?"
            value={postText}
            onChange={handlePostChange}
          ></textarea>

          {mediaFile && (
            <div className="media-preview">
              <p>Selected media: {mediaFile.name}</p>
            </div>
          )}

          <div className="post-actions">
            <div className="action-item" onClick={handleMediaClick}>
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

          {/* Hidden file input for media selection */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept="image/*,video/*" // Limit to images and videos (optional)
          />
        </div>

        <div className="create-post-footer">
          <button
            className="post-btn"
            onClick={handlePostSubmit}
            disabled={!postText && !mediaFile} // Disable button if no text or media
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
