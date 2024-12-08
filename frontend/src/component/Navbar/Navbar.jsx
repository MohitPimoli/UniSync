import React, { useState } from "react";
import "./Nav.css"; // We'll define some basic styles in this CSS file.

function Navbar({requestCount}) {
  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <>
      <nav className="navbar">
        <div className="brand">
          <a href="./">BRAND</a></div>
        <ul className="nav-links">
          <li>
            <a href="./ConnectionReq">Connection Requests {requestCount > 0 && `(${requestCount})`}</a>
          </li>
          <li>
            <a href="./Notification">Notifications</a>
          </li>
          <li>
            <a href="#page-updates">Page Updates</a>
          </li>
          <li>
            <button className="equals-btn" onClick={toggleSidebar}>
              =
            </button>{" "}
          </li>
        </ul>
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