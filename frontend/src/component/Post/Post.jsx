import React, { useState } from "react";
import "./Post.css";
import profileurl from "../../Photo/user.png";
import {
  FaThumbsUp,
  FaRegComment,
  FaShareAlt,
  FaPaperPlane,
  FaSave,
} from "react-icons/fa"; // Import FontAwesome icons

const Post = ({
  userName,
  profilePicture, ///// apply this profile to posts
  userTitle,
  timeStamp,
  content,
  media,
}) => {
  const [likes, setLikes] = useState(0); // State for like count
  const [liked, setLiked] = useState(false); // State to track if the post is liked
  const [showCommentBox, setShowCommentBox] = useState(false); // State to toggle the comment box
  const [comments, setComments] = useState([]); // State to store all comments
  const [commentText, setCommentText] = useState(""); // State for the comment input text

  // Handle like button click
  const handleLikeClick = () => {
    if (!liked) {
      setLikes((prevLikes) => prevLikes + 1); // Increment like count
    } else {
      setLikes((prevLikes) => prevLikes - 1); // Decrement like count if unliked
    }
    setLiked((prevLiked) => !prevLiked); // Toggle the liked state
  };

  // Handle comment button click to toggle the comment box
  const handleCommentClick = () => {
    setShowCommentBox((prevState) => !prevState);
  };

  // Handle posting a new comment
  const handlePostComment = () => {
    if (commentText.trim()) {
      setComments((prevComments) => [...prevComments, commentText]);
      setCommentText(""); // Clear the input box
    }
  };

  // Handle deleting a comment with confirmation
  const handleDeleteComment = (indexToDelete) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    ); // Confirmation dialog
    if (confirmDelete) {
      setComments((prevComments) =>
        prevComments.filter((_, index) => index !== indexToDelete)
      );
    }
  };

  // Handle save button click (if you want to add functionality)
  const handleSaveClick = () => {
    alert("Post saved!"); // Example functionality
  };
  return (
    <div className="post-card12">
      {/* User Info Section */}
      <div className="user-info">
        <img
          className="profile-img"
          src={profileurl} // Replace with actual profile image URL
          alt="Profile"
          crossOrigin="anonymous"
        />
        <div className="user-details">
          <h4>{userName}</h4>
          <p>{userTitle}</p>
          <span className="timestamp">{timeStamp}</span>
        </div>
      </div>

      {/* Post Content */}
      <div className="post-content">
        <p>{content}</p>
      </div>

      {/* Image Section */}
      <div className="post-image">
        {media && <img src={media} alt="Post Visual" />}
      </div>

      {/* Interaction Bar */}
      <div className="interaction-bar12">
        <button onClick={handleLikeClick}>
          <FaThumbsUp /> ({likes}) {/* Update button text and show count */}
        </button>
        <button onClick={handleCommentClick}>
          <FaRegComment /> ({comments.length}) {/* Display comment count */}
        </button>
        <button>
          <FaShareAlt />
        </button>
        <button>
          <FaPaperPlane />
        </button>
        <button onClick={handleSaveClick} className="save-button">
          <FaSave className="save-icon" /> {/* Save button with icon */}
        </button>
      </div>

      {/* Comment Section */}
      {showCommentBox && (
        <div className="comment-section">
          {/* Comment Input Box */}
          <div className="comment-input">
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button onClick={handlePostComment}>Post</button>
          </div>
          {/* Display Comments */}
          <div className="comment-list">
            {comments.map((comment, index) => (
              <div key={index} className="comment-item">
                <p>{comment}</p>
                <button
                  className="delete-comment-button"
                  onClick={() => handleDeleteComment(index)}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
