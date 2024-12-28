import React from 'react';
import { Link } from 'react-router-dom';
import './UserProfileCard.css';

const UserProfileCard = () => {
  const user = {
    namebhai: "Hardik Pant",
    university: "Graphic Era Hill University",
    profileViewers: 25,
    postImpressions: 17,
    groups: ["Python Developers Community"],
    events: [],
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

      <div className="profile-info1">
        <h3 className="profile-name1112">{user.namebhai}</h3>
        <p className="profile-university">{user.university}</p>
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

      <div className="section">
        <h4 className="section-title">Recent</h4>
        {user.groups.map((group, index) => (
          <div key={index} className="group-item">
            <span>{group}</span>
          </div>
        ))}
      </div>

      <div className="section">
        <h4 className="section-title">Events</h4>
        <p className="discover-text">Discover more</p>
      </div>
    </div>
  );
};

export default UserProfileCard;
