import React, { useState, useContext } from "react";
import "./Nav.css"; // Import the CSS file
import { AuthContext } from "../../context/AuthContext";
import logo from "../../Photo/logo_br.png";
//import defaultProfile from "../../Photo/user.png";
import bell from "../../Photo/bell.png";
import connection from "../../Photo/people.png";
import { IoMdSettings, IoIosHelpCircle } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { PiSignOutBold } from "react-icons/pi";
import UserProfileCard from "../UserProfileCard/UserProfileCard";

// Navbar component
function Navbar({ requestCount }) {
  const [dropdown, setDropdown] = useState(false);
  const [showUserProfileCard, setShowUserProfileCard] = useState(true);
  const { user, logout } = useContext(AuthContext);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleNavClick = () => {
    setShowUserProfileCard(false); // Hide the UserProfileCard on button click
  };

  return (
    <>
      <nav className="navbar">
        <div className="brand">
          <a href="./" onClick={() => setShowUserProfileCard(true)}>
            {/* Show UserProfileCard only on home page */}
            <img src={logo} alt="Unisync" />
          </a>
        </div>

        <div className="nav-div">
          <ul className="nav-links">
            <li>
              <a
                className="nav-con"
                href="./ConnectionReq"
                onClick={handleNavClick}
              >
                <img src={connection} alt="Connections" />{" "}
                {requestCount > 0 && `(${requestCount})`}
              </a>
            </li>
            <li>
              <a
                className="nav-not"
                href="./Notification"
                onClick={handleNavClick}
              >
                <img src={bell} alt="Notifications" />
              </a>
            </li>
            <li>
              <button className="profile-btn" onClick={toggleDropdown}>
                <img
                  src={user?.photoUrl}
                  alt="Profile"
                  crossOrigin="anonymous"
                />
              </button>
              {dropdown && (
                <div className="dropdown-menu">
                  {user ? (
                    <>
                      <div className="profile-header">
                        <div className="profile-info">
                          <img
                            src={user?.photoUrl}
                            alt="User"
                            crossOrigin="anonymous"
                          />
                          <div className="text-info">
                            <h4>{user.name}</h4>
                            <p>{user.role}</p>
                          </div>
                        </div>
                      </div>
                      <ul className="dropdown-links">
                        <li>
                          <span>
                            <CgProfile />
                          </span>
                          <a href="/profile" onClick={handleNavClick}>
                            Profile
                          </a>
                        </li>
                        <li>
                          <span>
                            <IoMdSettings />
                          </span>
                          <a href="/setting" onClick={handleNavClick}>
                            Settings & Privacy
                          </a>
                        </li>
                        <li>
                          <span>
                            <IoIosHelpCircle />
                          </span>
                          <a href="/ContactUs" onClick={handleNavClick}>
                            Help
                          </a>
                        </li>
                        <li>
                          <span>
                            <PiSignOutBold />
                          </span>
                          <a href="/login" onClick={() => {
                            logout();
                            handleNavClick();
                          }}>
                            Sign Out
                          </a>
                        </li>
                      </ul>
                    </>
                  ) : (
                    <ul className="dropdown-links">
                      <li>
                        <a href="/Login" onClick={handleNavClick}>
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

      {/* Conditionally render UserProfileCard */}
      {showUserProfileCard && (
        <div className="UserprofileCard">
          <UserProfileCard />
        </div>
      )}
    </>
  );
}

export default Navbar;
