import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./UserProfileCard.css";

const UserProfileCard = () => {
  const { user, isLoading } = useContext(AuthContext);

  useEffect(() => {
    console.log("Loading state:", isLoading);
    console.log("User data:", user);
  }, [isLoading, user]);

  if (!user) {
    return <div>No user data available.</div>;
  }

  // Set default values if fields are missing
  const profilePicture =
    user.photoUrl || "https://i.postimg.cc/pLymkyHr/user.png";
  const name = user.name || "N/A";
  const bio = user.bio || "No bio available";
  const email = user.email || "Email not available";
  const location = user.location || "Location not specified";
  const fieldOfInterest =
    user.fieldOfInterest?.join(", ") || "No interests listed";

  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-image-container">
          <img
            src={profilePicture}
            alt="Profile"
            className="profile-image"
            crossOrigin="anonymous"
          />
        </div>
      </div>

      <div className="profile-info">
        <h3 className="profile-name">{name}</h3>
        <p className="profile-bio">{bio}</p>
        <p className="profile-details">
          📧 {email} <br />
          📍 {location} <br />
          🎓 Interests: {fieldOfInterest}
        </p>
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
