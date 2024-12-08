import React, { useState } from "react";
import { FaThumbsUp, FaRegComment, FaRegShareSquare, FaPaperPlane } from "react-icons/fa"; // Importing icons
import "./Post_Code.css";

const Post = () => {
  // Static post details
  const userName = "John Doe";
  const userPhoto =
    "https://via.placeholder.com/150"; // Replace with actual user photo URL if needed
  const userTitle = "SDE @ Microsoft | Former SDE Intern @ Microsoft";
  const codeLanguage = "C++";
  const codeSnippet = ` Two Sum Problem
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (seen.count(complement)) {
            return {seen[complement], i};
        }
        seen[nums[i]] = i;
    }
    return {};
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    vector<int> result = twoSum(nums, target);
    cout << "Indices: " << result[0] << ", " << result[1] << endl;
    return 0;
}`;
  const timeStamp = "Posted 2 hours ago";
  const solution = "Optimize the code."; // Optional shared solution text

  const [likes, setLikes] = useState(0); // State for like count
  const [liked, setLiked] = useState(false); // State to track if the post is liked
  const [showCommentBox, setShowCommentBox] = useState(false); // State to toggle the comment box
  const [comments, setComments] = useState([]); // State to store all comments
  const [commentText, setCommentText] = useState(""); // State for the comment input text

  // Handle like button click
  const handleLikeClick = () => {
    setLikes((prevLikes) => (liked ? prevLikes - 1 : prevLikes + 1));
    setLiked((prevLiked) => !prevLiked);
  };

  // Handle comment button click to toggle the comment box
  const handleCommentClick = () => {
    setShowCommentBox((prevState) => !prevState);
  };

  // Handle posting a new comment
  const handlePostComment = () => {
    if (commentText.trim()) {
      setComments((prevComments) => [...prevComments, commentText]);
      setCommentText("");
    }
  };

  // Handle deleting a comment with confirmation
  const handleDeleteComment = (indexToDelete) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      setComments((prevComments) =>
        prevComments.filter((_, index) => index !== indexToDelete)
      );
    }
  };

  return (
    <div className="post-card">
      {/* User Info Section */}
      <div className="user-info">
        <img className="profile-img" src={userPhoto} alt="User Profile" />
        <div className="user-details">
          <h4>{userName}</h4>
          <div className="user-title-container">
            <p>{userTitle}</p> {/* User's title and language */}
          </div>
          <span className="timestamp">{timeStamp}</span>
        </div>
      </div>

      {/* Solution Section */}
      {solution && (
        <div className="post-solution">
          <h5>Description:</h5>
          <span className="code-language">{codeLanguage}</span>
          <p>{solution}</p>
        </div>
      )}
      {/* Post Code Section */}
      <div className="post-content">
        <pre className="code-snippet">
          <code>{codeSnippet}</code>
        </pre>
      </div>

      {/* Interaction Bar with Icons */}
      <div className="interaction-bar">
        <button onClick={handleLikeClick}>
          <FaThumbsUp /> {liked ? "Unlike" : "Like"} ({likes})
        </button>
        <button onClick={handleCommentClick}>
          <FaRegComment /> Comment ({comments.length})
        </button>
        <button>
          <FaRegShareSquare /> Repost
        </button>
        <button>
          <FaPaperPlane /> Send
        </button>
      </div>

      {/* Comment Section */}
      {showCommentBox && (
        <div className="comment-section">
          <div className="comment-input">
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button onClick={handlePostComment}>Post</button>
          </div>
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
