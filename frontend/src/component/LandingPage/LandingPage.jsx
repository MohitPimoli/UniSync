import React, { useState, useContext, useEffect } from "react";
import LoadingScreen from "../LoadingScrean/LoadingScreen";
import Navbar from "../Navbar/Navbar";
import CreatePostPage from "../CreatePost/CreateNewPost";
import Post from "../Post/Post";
import PostQuery from "../Post_Query/Post_Query";
import PostCode from "../Post_Code/Post_Code";
import "./LandingPage.css";
import { AuthContext } from "../../context/AuthContext";

function Landing() {
  const [activePage, setActivePage] = useState("Post"); // Default to "Post" page
  const [showPostForm, setShowPostForm] = useState(false);
  const { user, isLoading, setLoading } = useContext(AuthContext);

  // Sample data for posts
  const posts = [
    {
      id: 1,
      userName: "Sarang Kulkarni",
      userTitle: "SDE @ Microsoft | Former SDE Intern @ Microsoft",
      userWebsite: "https://mywebsite.com",
      timeStamp: "10m",
      content: "As a recent graduate, I am struggling to clear interviews.",
      imageUrl: "https://via.placeholder.com/400", // Replace with actual image URL
    },
    {
      id: 2,
      userName: "John Doe",
      userTitle: "Software Engineer @ Google",
      userWebsite: "https://johndoe.com",
      timeStamp: "1h",
      content: "Excited to start my new journey!",
      imageUrl: "https://via.placeholder.com/400", // Replace with actual image URL
    },
  ];
  useEffect(() => {
    setLoading(!user); // Set loading state based on user availability
  }, [user, setLoading]);

  // Show loading screen if data is being fetched
  if (isLoading) return <LoadingScreen />;

  const handlePostInputClick = () => {
    setShowPostForm(true);
  };

  const handleClosePostForm = () => {
    setShowPostForm(false);
  };

  return (
    <>
      <Navbar />
      <div className="post-container">
        <div className="post-header">
          <img
            src={
              user?.photoUrl || "http://localhost:5001/uploads/user.png"
            } /* Replace with your profile image URL */
            alt="Profile"
            crossOrigin="anonymous"
            className="profile-pic"
          />
          <input
            type="text"
            className="post-input"
            placeholder="Start a post, try writing with AI"
            onClick={handlePostInputClick} // Opens the post modal
          />
        </div>
        <div className="Different">
          <div
            className={`POST ${activePage === "Post" ? "active-tab" : ""}`}
            onClick={() => setActivePage("Post")}
          >
            Post
          </div>
          <div
            className={`Query_Post ${
              activePage === "Query" ? "active-tab" : ""
            }`}
            onClick={() => setActivePage("Query")}
          >
            Query
          </div>
          <div
            className={`Code_Post ${activePage === "Code" ? "active-tab" : ""}`}
            onClick={() => setActivePage("Code")}
          >
            Code Area
          </div>
        </div>
      </div>

      {/* Show the respective page based on the activePage state */}
      {activePage === "Post" && (
        <div className="posts-list">
          {posts.map((post) => (
            <Post
              key={post.id}
              userName={post.userName}
              userTitle={post.userTitle}
              userWebsite={post.userWebsite}
              timeStamp={post.timeStamp}
              content={post.content}
              imageUrl={post.imageUrl}
            />
          ))}
        </div>
      )}
      {activePage === "Query" && <PostQuery />}
      {activePage === "Code" && <PostCode />}

      {/* Show CreatePostPage when user clicks on the input */}
      {showPostForm && (
        <CreatePostPage closePost={handleClosePostForm} /> // Show modal when user clicks the input box
      )}
    </>
  );
}

export default Landing;
