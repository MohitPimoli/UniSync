import React, { useState } from "react";
import "./Setting.css";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("SignInSecurity");
  // State for Sign-In & Security
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [emailData, setEmailData] = useState({
    currentEmail: "",
    newEmail: "",
    confirmEmail: "",
  });

  // State for Data Privacy
  const [searchHistory, setSearchHistory] = useState(false);
//   const [communicationPreference, setCommunicationPreference] = useState("Only Connections");

  // State for Visibility
  const [visibilitySettings, setVisibilitySettings] = useState({
    post: "Everyone",
    code: "Everyone",
    query: "Everyone",
  });

  const handleVisibilityChange = (event) => {
    const { name, value } = event.target;
    setVisibilitySettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handlePasswordChange = () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill out all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    alert("Password successfully changed!");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleEmailChange = () => {
    const { currentEmail, newEmail, confirmEmail } = emailData;
    if (!currentEmail || !newEmail || !confirmEmail) {
      alert("Please fill out all fields.");
      return;
    }
    if (newEmail !== confirmEmail) {
      alert("New email and confirm email do not match.");
      return;
    }
    alert("Email successfully changed!");
    setEmailData({ currentEmail: "", newEmail: "", confirmEmail: "" });
  };

  const handleDownloadData = () => {
    alert("Your data download request has been initiated!");
  };

  const handleSearchHistoryToggle = () => {
    setSearchHistory((prev) => !prev);
    alert(`Search history has been ${!searchHistory ? "enabled" : "disabled"}.`);
  };

//   const handleCommunicationPreferenceChange = (event) => {
//     setCommunicationPreference(event.target.value);
//     alert(`Communication preference set to: ${event.target.value}`);
//   };

  const renderSignInSecurity = () => (
    <div className="content">
      <h2>Sign in & Security</h2>
      <div className="setting-item">
        <label>Change Password</label>
        <input
          type="password"
          placeholder="Current Password"
          value={passwordData.currentPassword}
          onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
        />
        <input
          type="password"
          placeholder="New Password"
          value={passwordData.newPassword}
          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={passwordData.confirmPassword}
          onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
        />
        <button onClick={handlePasswordChange}>Update Password</button>
      </div>
      <div className="setting-item">
        <label>Change Email</label>
        <input
          type="email"
          placeholder="Current Email"
          value={emailData.currentEmail}
          onChange={(e) => setEmailData({ ...emailData, currentEmail: e.target.value })}
        />
        <input
          type="email"
          placeholder="New Email"
          value={emailData.newEmail}
          onChange={(e) => setEmailData({ ...emailData, newEmail: e.target.value })}
        />
        <input
          type="email"
          placeholder="Confirm New Email"
          value={emailData.confirmEmail}
          onChange={(e) => setEmailData({ ...emailData, confirmEmail: e.target.value })}
        />
        <button onClick={handleEmailChange}>Update Email</button>
      </div>
    </div>
  );

  const renderVisibility = () => (
    <div className="content">
      <h2>Visibility</h2>
      <div className="setting-item">
        <label>Profile Viewing Options</label>
        <select>
          <option>Your name and headline</option>
          <option>Anonymous</option>
        </select>
      </div>
      <div className="setting-item">
        <label>Who Can See Your Connections</label>
        <select>
          <option>Only Me</option>
          <option>My Connections</option>
          <option>Public</option>
        </select>
      </div>
      <div className="setting-item">
        <label>Who Can View My Post</label>
        <select
          name="post"
          value={visibilitySettings.post}
          onChange={handleVisibilityChange}
        >
          <option value="Everyone">Everyone</option>
          <option value="Friends">Friends</option>
          <option value="Only Me">Only Me</option>
        </select>
      </div>
      <div className="setting-item">
        <label>Who Can View My Code</label>
        <select
          name="code"
          value={visibilitySettings.code}
          onChange={handleVisibilityChange}
        >
          <option value="Everyone">Everyone</option>
          <option value="Friends">Friends</option>
          <option value="Only Me">Only Me</option>
        </select>
      </div>
      <div className="setting-item">
        <label>Who Can View My Query</label>
        <select
          name="query"
          value={visibilitySettings.query}
          onChange={handleVisibilityChange}
        >
          <option value="Everyone">Everyone</option>
          <option value="Friends">Friends</option>
          <option value="Only Me">Only Me</option>
        </select>
      </div>
    </div>
  );

  const renderDataPrivacy = () => (
    <div className="content">
      <h2>Data Privacy</h2>
      <div className="setting-item">
        <label>Manage your data and activity</label>
        <button onClick={() => alert("Manage your data section opened.")}>View</button>
      </div>
      <div className="setting-item">
        <label>Get a copy of your data</label>
        <button onClick={handleDownloadData}>Request</button>
      </div>
      <div className="setting-item">
        <label>Search history</label>
        <div className="toggle-container">
          <input
            type="checkbox"
            checked={searchHistory}
            onChange={handleSearchHistoryToggle}
          />
          <span>{searchHistory ? "On" : "Off"}</span>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "SignInSecurity":
        return renderSignInSecurity();
      case "Visibility":
        return renderVisibility();
      case "DataPrivacy":
        return renderDataPrivacy();
      default:
        return <div>Select a tab to view content</div>;
    }
  };

  return (
    <div className="settings">
      <aside className="sidebar">
        <h3>Settings</h3>
        <ul>
          <li
            className={activeTab === "SignInSecurity" ? "active" : ""}
            onClick={() => setActiveTab("SignInSecurity")}
          >
            Sign in & Security
          </li>
          <li
            className={activeTab === "Visibility" ? "active" : ""}
            onClick={() => setActiveTab("Visibility")}
          >
            Visibility
          </li>
          <li
            className={activeTab === "DataPrivacy" ? "active" : ""}
            onClick={() => setActiveTab("DataPrivacy")}
          >
            Data Privacy
          </li>
        </ul>
      </aside>
      <main className="main-content">{renderContent()}</main>
    </div>
  );
};

export default Settings;