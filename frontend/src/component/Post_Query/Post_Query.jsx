import React, { useState } from "react";
import { FaThumbsUp, FaRegComment, FaShareAlt, FaPaperPlane, FaSave } from "react-icons/fa";
import "./Post_Query.css";

const PostPage = () => {
  // Initial posts data with state
  const [posts, setPosts] = useState([
    {
      id: 1,
      userPhoto: "https://i.postimg.cc/Qtsg6vg3/nikhil.jpg", // User photo URL
      userName: "Alice Johnson",
      userTitle: "Software Developer",
      content: "This is my first static post! Excited to connect with everyone here.",
      timeStamp: "2024-12-13 10:30 AM",
      likes: 0,
      liked: false,
      comments: [],
      showCommentBox: false,
      commentText: "", // State for the comment text of this post
    },
    {
      id: 2,
      userPhoto: "https://i.postimg.cc/mkcdGGxx/user2.jpg", // User photo URL
      userName: "Bob Smith",
      userTitle: "Data Scientist",
      content: "Does anyone have experience with deploying models on AWS? Looking for tips.",
      timeStamp: "2024-12-12 08:15 PM",
      likes: 0,
      liked: false,
      comments: [],
      showCommentBox: false,
      commentText: "", // State for the comment text of this post
    },
    {
      id: 3,
      userPhoto: "https://i.postimg.cc/qM4LQhHv/user3.jpg", // User photo URL
      userName: "Catherine Lee",
      userTitle: "Product Manager",
      content: "Just wrapped up a great product launch! Feeling proud of the team. 🎉",
      timeStamp: "2024-12-11 02:45 PM",
      likes: 0,
      liked: false,
      comments: [],
      showCommentBox: false,
      commentText: "", // State for the comment text of this post
    },
  ]);

  // Handle like button click
  const handleLikeClick = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, likes: post.liked ? post.likes - 1 : post.likes + 1, liked: !post.liked }
          : post
      )
    );
  };

  // Handle comment button click to toggle the comment box
  const handleCommentClick = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, showCommentBox: !post.showCommentBox } : post
      )
    );
  };

  // Handle posting a new comment
  const handlePostComment = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId && post.commentText.trim()
          ? {
              ...post,
              comments: [...post.comments, post.commentText],
              commentText: "", // Reset the comment text after posting
            }
          : post
      )
    );
  };

  // Handle deleting a comment with confirmation
  const handleDeleteComment = (postId, indexToDelete) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: post.comments.filter((_, index) => index !== indexToDelete),
              }
            : post
        )
      );
    }
  };

  // Handle comment text change
  const handleCommentTextChange = (postId, newCommentText) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, commentText: newCommentText } : post
      )
    );
  };

  return (
    <>
      <div className="post-list">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            {/* User Info */}
            <div className="user-info">
              <img src={post.userPhoto} alt="User" className="user-photo" />
              <div>
                <h4>{post.userName}</h4>
                <p>{post.userTitle}</p>
                <span className="timestamp">{post.timeStamp}</span>
              </div>
            </div>

            {/* Post Content */}
            <div className="post-content">{post.content}</div>

            {/* Interaction Bar */}
            <div className="interaction-bar">
              <button onClick={() => handleLikeClick(post.id)}>
                <FaThumbsUp /> ({post.likes}) {/* Update button text and show count */}
              </button>
              <button onClick={() => handleCommentClick(post.id)}>
                <FaRegComment /> ({post.comments.length}) {/* Display comment count */}
              </button>
              <button>
                <FaShareAlt />
              </button>
              <button>
                <FaPaperPlane />
              </button>
              <button className="save-button">
                <FaSave className="save-icon" /> {/* Save button with icon */}
              </button>
            </div>

            {/* Comment Section */}
            {post.showCommentBox && (
              <div className="comment-section">
                <div className="comment-input">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={post.commentText}
                    onChange={(e) => handleCommentTextChange(post.id, e.target.value)}
                  />
                  <button onClick={() => handlePostComment(post.id)}>Post</button>
                </div>
                <div className="comment-list">
                  {post.comments.map((comment, index) => (
                    <div key={index} className="comment-item">
                      <p>{comment}</p>
                      <button
                        className="delete-comment-button"
                        onClick={() => handleDeleteComment(post.id, index)}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default PostPage;
