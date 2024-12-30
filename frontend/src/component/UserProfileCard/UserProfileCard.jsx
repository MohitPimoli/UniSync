import React from "react";
import { Link } from "react-router-dom";
import "./UserProfileCard.css";

const UserProfileCard = () => {
  const user = {
    name: "Hardik Pant",
    university: "Graphic Era Hill University",
    profileViewers: 25,
    postImpressions: 17,
    email: "hardikpant@example.com",
    phone: "+91-9876543210",
    location: "Dehradun, India",
    bio: "A passionate developer and tech enthusiast with an interest in AI and ML.",
  };

  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-image-container">
          <img
            src="https://via.placeholder.com/80"
            alt="Profile"
            className="profile-image"
          />
        </div>
      </div>

      <div className="profile-info">
        <h3 className="profile-name">{user.name}</h3>
        <p className="profile-university">{user.university}</p>
        <p className="profile-bio">{user.bio}</p>
        <p className="profile-details">
          📧 {user.email} <br /> 📞 {user.phone} <br /> 📍 {user.location}
        </p>
      </div>

      <div className="stats-container">
        <div className="stat-item">
          <span>Profile viewers</span>
          <span className="stat-value">{user.profileViewers}</span>
        </div>
        <div className="stat-item">
          <span>Post impressions</span>
          <span className="stat-value">{user.postImpressions}</span>
        </div>
      </div>

      <div className="section">
        <Link to="/saved-posts" className="saved-items-button">
          View Saved Posts
        </Link>
      </div>
    </div>
  );
};

export default UserProfileCard;
