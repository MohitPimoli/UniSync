import React, { useState } from "react";
import {
  FaThumbsUp,
  FaRegComment,
  FaShareAlt,
  FaPaperPlane,
  FaSave,
} from "react-icons/fa";
import "./Post_Query.css";

const PostPage = ({ posts }) => {
  const [postList, setPostList] = useState(posts || []); // Use posts prop or default to empty array

  // Handle like button click
  const handleLikeClick = (postId) => {
    setPostList((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? {
              ...post,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
              liked: !post.liked,
            }
          : post
      )
    );
  };

  // Handle comment button click to toggle the comment box
  const handleCommentClick = (postId) => {
    setPostList((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, showCommentBox: !post.showCommentBox }
          : post
      )
    );
  };

  // Handle posting a new comment
  const handlePostComment = (postId) => {
    setPostList((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId && post.commentText.trim()
          ? {
              ...post,
              comments: [...post.comments, post.commentText],
              commentText: "",
            }
          : post
      )
    );
  };

  // Handle deleting a comment with confirmation
  const handleDeleteComment = (postId, indexToDelete) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      setPostList((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                comments: post.comments.filter(
                  (_, index) => index !== indexToDelete
                ),
              }
            : post
        )
      );
    }
  };

  // Handle comment text change
  const handleCommentTextChange = (postId, newCommentText) => {
    setPostList((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId ? { ...post, commentText: newCommentText } : post
      )
    );
  };

  return (
    <>
      <div className="post-list">
        {postList.map((post) => (
          <div key={post._id} className="post-card">
            <div className="user-info">
              <img src={post.userPhoto} alt="User" className="user-photo" />
              <div>
                <h4>{post.userName}</h4>
                <p>{post.userTitle}</p>
                <span className="timestamp">{post.timeStamp}</span>
              </div>
            </div>
            <div className="post-content">{post.content}</div>
            <div className="interaction-bar">
              <button onClick={() => handleLikeClick(post._id)}>
                <FaThumbsUp /> ({post.likes || 0})
              </button>
              <button onClick={() => handleCommentClick(post._id)}>
                <FaRegComment /> ({post.comments.length})
              </button>
              <button>
                <FaShareAlt />
              </button>
              <button>
                <FaPaperPlane />
              </button>
              <button className="save-button">
                <FaSave className="save-icon" />
              </button>
            </div>
            {post.showCommentBox && (
              <div className="comment-section">
                <div className="comment-input">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={post.commentText || ""}
                    onChange={(e) =>
                      handleCommentTextChange(post._id, e.target.value)
                    }
                  />
                  <button onClick={() => handlePostComment(post._id)}>
                    Post
                  </button>
                </div>
                <div className="comment-list">
                  {post.comments.map((comment, index) => (
                    <div key={index} className="comment-item">
                      <p>{comment}</p>
                      <button
                        className="delete-comment-button"
                        onClick={() => handleDeleteComment(post._id, index)}
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
