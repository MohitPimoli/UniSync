import React, { useState } from "react";
import "./Nav.css"; // Styles
import logo from "../../Photo/logo_br.png";
import defaultProfile from "../../Photo/user.png";
import bell from "../../Photo/bell.png";
import connection from "../../Photo/people.png";

function Navbar({ requestCount }) {
  const [dropdown, setDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check login status
  const [userProfile, setUserProfile] = useState({}); // State to store user profile info

  const toggleDropdown = () => {
    setDropdown(!dropdown);
    
  };
  
  // Mock sign-in function
  const handleSignIn = () => {
    setIsLoggedIn(true);
    
    setUserProfile({
      name: "Nikhil Singh Bisht",
      role: "Graphic Era Hill University",
      profileImage: "https://i.postimg.cc/Qtsg6vg3/nikhil.jpg", // Replace with real profile image URL
    });
  };

  // Mock sign-out function
  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUserProfile({});
  };

  return (
    <>
      <nav className="navbar">
        <div className="brand">
          <a href="./">
            <img src={logo} alt="Unisync" />
          </a>
        </div>

        <div className="nav-div">
          <ul className="nav-links">
            <li>
              <a className="nav-con" href="./ConnectionReq">
                <img src={connection} alt="Connections" />{" "}
                {requestCount > 0 && `(${requestCount})`}
              </a>
            </li>
            <li>
              <a className="nav-not" href="./Notification">
                <img src={bell} alt="Notifications" />
              </a>
            </li>
            <li>
              <button className="profile-btn" onClick={toggleDropdown}>
                <img
                  src={isLoggedIn && userProfile.profileImage ? userProfile.profileImage : defaultProfile}
                  alt="Profile"
                />
              </button>
              {dropdown && (
                <div className="dropdown-menu">
                  {isLoggedIn ? (
                    // User is logged in
                    <>
                      <div className="profile-header">
                        <div className="profile-info">
                          <img src={userProfile.profileImage} alt="User" />
                          <div className="text-info">
                            <h4>{userProfile.name}</h4>
                            <p>{userProfile.role}</p>
                          </div>
                        </div>
                      </div>
                      <ul className="dropdown-links">
                        <li>
                          <a href="/UserDetail">View Profile</a>
                        </li>
                        <li>
                          <a href="/aboutus">Settings & Privacy</a>
                        </li>
                        <li>
                          <a href="/ContactUs">Help</a>
                        </li>
                        <li>
                          <a href="/logout" onClick={handleSignOut}>
                            Sign Out
                          </a>
                        </li>
                      </ul>
                    </>
                  ) : (
                    // User is not logged in
                    <ul className="dropdown-links">
                      <li>
                        <a href="/Login" onClick={handleSignIn}>
                          Sign In
                        </a>
                      </li>
                    </ul>
                  )}
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

