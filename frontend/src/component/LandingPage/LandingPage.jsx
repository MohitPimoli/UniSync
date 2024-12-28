import React, { useState, useContext, useEffect, useCallback } from "react";
import LoadingScreen from "../LoadingScrean/LoadingScreen";
import Navbar from "../Navbar/Navbar";
import CreatePostPage from "../CreatePost/CreateNewPost";
import Post from "../Post/Post";
import PostQuery from "../Post_Query/Post_Query";
import PostCode from "../Post_Code/Post_Code";
import "./LandingPage.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

function Landing() {
  const [activePage, setActivePage] = useState("Post");
  const [showPostForm, setShowPostForm] = useState(false);
  const { token, user, isLoading, setLoading } = useContext(AuthContext);
  const [newPost, setNewPost] = useState(null);
  const [posts, setPosts] = useState(null);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (user && !isLoading) {
      setLoading(true);
    }
  }, [user, isLoading, setLoading]);

  const fetchRecentPosts = useCallback(async () => {
    if (!user || fetched) return;
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5001/posts/GetRecentPosts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts(response.data);
      setFetched(true);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, [user, setLoading, fetched, token]);
  console.log("Posts: of landingpage", posts);

  useEffect(() => {
    if (user) {
      fetchRecentPosts();
    }
  }, [user, fetchRecentPosts]);

  const addNewPost = (post) => {
    setPosts((prevPosts) => [
      post,
      ...prevPosts.slice(0, prevPosts.length - 1),
    ]);
    setNewPost(post);
  };

  console.log("newPost:", newPost);

  // Show loading screen if still loading
  if (isLoading && !fetched) return <LoadingScreen />;

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
            src={user?.photoUrl}
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
            Code
          </div>
        </div>
      </div>

      {/* Show the respective page based on the activePage state */}
      {activePage === "Post" &&
        posts &&
        posts.map((post) => (
          <div className="posts-list" key={post.id}>
            <Post
              userName={post.userId?.name}
              userProfilePicture={post.userId?.profilePicture}
              userTitle={post.userId?.userTitle}
              timeStamp={new Date(post.createdAt).toLocaleString()}
              content={post.content}
              media={post.media}
            />
          </div>
        ))}

      {activePage === "Query" && <PostQuery />}
      {activePage === "Code" && <PostCode />}

      {/* Show CreatePostPage when user clicks on the input */}
      {showPostForm && (
        <CreatePostPage
          closePost={handleClosePostForm}
          addNewPost={addNewPost}
        /> // Show modal when user clicks the input box
      )}
    </>
  );
}

export default Landing;
