import React, { useState } from "react";
import "./Post.css";

const Post = ({ userName, userTitle, userWebsite, timeStamp, content, imageUrl }) => {
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

  return (
    <div className="post-card12">
      {/* User Info Section */}
      <div className="user-info">
        <img
          className="profile-img"
          src="https://via.placeholder.com/50" // Replace with actual profile image URL
          alt="Profile"
        />
        <div className="user-details">
          <h4>{userName}</h4>
          <p>{userTitle}</p>
          <a href={userWebsite} target="_blank" rel="noopener noreferrer">
            Visit my website
          </a>
          <span className="timestamp">{timeStamp}</span>
        </div>
      </div>

      {/* Post Content */}
      <div className="post-content">
        <p>{content}</p>
      </div>

      {/* Image Section */}
      <div className="post-image">
        <img src={imageUrl} alt="Post Visual" />
      </div>

      {/* Interaction Bar */}
      <div className="interaction-bar">
        <button onClick={handleLikeClick}>
          {liked ? "Unlike" : "Like"} ({likes}) {/* Update button text and show count */}
        </button>
        <button onClick={handleCommentClick}>
          Comment ({comments.length}) {/* Display comment count */}
        </button>
        <button>Repost</button>
        <button>Send</button>
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
