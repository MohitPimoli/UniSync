import React from "react";
import "./Userdetail.css";

const User_detail = () => {

  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="profile-page122">
      {/* Header Section */}
      <div className="profile-header122">
        <img
          className="cover-image122"
          src="https://i.postimg.cc/Qtsg6vg3/nikhil.jpg"
          alt="Cover"
        />
        <div className="profile-info-container122">
          <div className="profile-info122">
            <img
              className="profile-pic122"
              src="https://i.postimg.cc/Qtsg6vg3/nikhil.jpg"
              alt="Profile"
            />
            <div className="profile-details122">
              <p style={{ fontWeight: "bold" }}>Hardik Pant</p>
              <p>Student | 2021 - 2025</p>
              <p>B.Tech. - Computer Science & Engineering</p>
              <p>Graphic Era Hill University, Haldwani</p>
              <div className="social-links122">
                <a href="https://github.com">GitHub</a>
                <a href="https://linkedin.com">LinkedIn</a>
                <a href="https://website.com">Website</a>
              </div>
            </div>
          </div>
          <div className="profile-actions122">
            <a style ={{textDecoration:"none"}} className="edit-profile-btn122" href="/editprofile" >Edit Profile</a>
            <a tyle ={{textDecoration:"none"}} className="change-password-btn122" href="/Setting"  >Change Password</a>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="profile-tabs122">
        {[<b>Summary</b>, "Career Journey", "Contact", "Activity"].map((tab) => (
          <button
            key={tab}
            className="tab-button122"
            onClick={() =>
              handleScrollToSection(tab.toLowerCase().replace(" ", ""))
            }
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content122">
          <div id="Language">
            <h4>Known Language</h4>
          <p>
            <span className="badge122">English</span>{" "}
            <span className="badge122">Hindi</span>
          </p>
          </div>
        <div id="careerjourney">
          <h4>Career Journey</h4>
          <p>B.Tech. Computer Science & Engineering, Graphic Era University</p>
        </div>
        <div id="contact">
          <h4>Contact Information</h4>
          <div className="contact-info122">
            <div>
              <strong>Current Address:</strong>
              <p>Ward No.4 Bandia</p>
            </div>
            <div>
              <strong>Permanent Address:</strong>
              <p>Ward No.4 Bandia</p>
            </div>
          </div>
        </div>
        <div id="activity">
          <h4>Activity</h4>
          <p>There are no posts.</p>
        </div>
      </div>
    </div>
  );
};

export default User_detail;