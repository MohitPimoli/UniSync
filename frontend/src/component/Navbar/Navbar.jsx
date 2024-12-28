import React, { useState, useContext } from "react";
import "./Nav.css"; // Styles
import { AuthContext } from "../../context/AuthContext";
import logo from "../../Photo/logo_br.png";
//import defaultProfile from "../../Photo/user.png";
import bell from "../../Photo/bell.png";
import connection from "../../Photo/people.png";

function Navbar({ requestCount }) {
  const [dropdown, setDropdown] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
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
                          <a href="/profile">Profile</a>
                        </li>
                        <li>
                          <a href="/aboutus">Settings & Privacy</a>
                        </li>
                        <li>
                          <a href="/ContactUs">Help</a>
                        </li>
                        <li>
                          <a href="/login" onClick={logout}>
                            Sign Out
                          </a>
                        </li>
                      </ul>
                    </>
                  ) : (
                    // User is not logged in
                    <ul className="dropdown-links">
                      <li>
                        <a href="/Login">Sign In</a>
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
