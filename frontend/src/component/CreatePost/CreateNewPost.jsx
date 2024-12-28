import React, { useState, useRef, useContext } from "react";
import "./CreateNewPost.css";
import { AuthContext } from "../../context/AuthContext";
import { GrGallery } from "react-icons/gr";
import { RiArticleLine } from "react-icons/ri";
import { MdOutlineQuestionMark } from "react-icons/md";
import axios from "axios";
import QueryPage from "../CreateQuery/GenerateQuere";
import CodeArea from "../CreateCode/CreateCode";

const CreateNewPost = ({ closePost, addNewPost }) => {
  const [postText, setPostText] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showQueryPage, setShowQueryPage] = useState(false);
  const [showCodeArea, setShowCodeArea] = useState(false); // New state for CodeArea visibility
  const { user, token } = useContext(AuthContext);
  const handlePostChange = (e) => {
    setPostText(e.target.value);
  };

  const handleMediaClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setMediaFile(file);
    }
  };

  const handlePostSubmit = async () => {
    if (!postText && !mediaFile) {
      setError("Please add some text or select a media file.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("content", postText);
      if (mediaFile) {
        formData.append("media", mediaFile);
      }
      console.log("Token being sent:", token);
      const response = await axios.post(
        "http://localhost:5001/posts/CreatePost",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Post submitted successfully:", response.data);
      addNewPost(response.data.post);
      closePost();
    } catch (err) {
      console.error(
        "Error submitting post:",
        err.response || err.message || err
      );
      setError(
        err.response?.data?.message ||
          "An error occurred while submitting the post."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQueryClick = () => {
    setShowQueryPage(true);
  };

  const handleCloseQueryPage = () => {
    setShowQueryPage(false);
  };

  const handleCodeClick = () => {
    setShowCodeArea(true);
  };

  const handleCloseCodeArea = () => {
    setShowCodeArea(false);
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
              src={user?.photoUrl}
              alt="User"
              crossOrigin="anonymous"
              className="profile-pic-modal"
            />
            <div className="user-details">
              <p className="username1">{user ? user.name : "Guest"}</p>
            </div>
            <div>
              <p className="visibility1">Public</p>
            </div>
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
            <div className="action-item" onClick={handleQueryClick}>
              <MdOutlineQuestionMark />
              <span>Query</span>
            </div>
            <div className="action-item" onClick={handleCodeClick}>
              <RiArticleLine />
              <span>Code</span>
            </div>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept="image/*,video/*"
          />
        </div>
        {error && <p className="error-message">{error}</p>}

        <div className="create-post-footer">
          <button
            className="post-btn"
            onClick={handlePostSubmit}
            disabled={isSubmitting || (!postText && !mediaFile)}
          >
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </div>
      </div>

      {/* Show the QueryPage modal when the query button is clicked */}
      {showQueryPage && <QueryPage closeQuery={handleCloseQueryPage} />}

      {/* Show the CodeArea modal when the "Write Code" button is clicked */}
      {showCodeArea && <CodeArea closeCodeArea={handleCloseCodeArea} />}
    </div>
  );
};

export default CreateNewPost;
