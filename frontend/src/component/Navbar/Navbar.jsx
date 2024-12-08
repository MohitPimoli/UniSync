import React, { useState } from "react";
import "./Nav.css"; // We'll define some basic styles in this CSS file.
import logo from "../../Photo/logo_br.png";
import profile from "../../Photo/user.png";
import bell from "../../Photo/bell.png";
import connection from "../../Photo/people.png";
function Navbar({ requestCount }) {
  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
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
            <button className="profile-btn" onClick={toggleSidebar}>
              <img src={profile} alt="Profile" />
            </button>{" "}
          </li>
        </ul>
      </div>
      </nav>

      <div className={`sidebar ${sidebar ? "active" : ""}`}>
        <button className="close-btn" onClick={toggleSidebar}>
          ×
        </button>
        <ul>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/signup">Signup</a>
          </li>
          <li>
            <a href="/Aboutus">About Us</a>
          </li>
          <li>
            <a href="/ContactUs">Contact Us</a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
