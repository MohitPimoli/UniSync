import React, { useState } from "react";
import "./User_detail.css";

function User_detail() {
  const initialUser = {
    name: "John Doe",
    role: "Frontend Developer",
    age: 28,
    experienceYears: 6,
    phone: "+1 234 567 890",
    location: "New York, USA",
    email: "johndoe@example.com",
    ctc: "100k/year",
    bio: "A full-stack developer with experience in creating scalable web applications. I am passionate about problem-solving, UI/UX design, and collaborating with teams.",
    skills: ["React", "JavaScript", "CSS", "HTML", "Node.js", "Wireframing"],
    posts: [
      { title: "My First Post", content: "This is the content of my first post." },
      { title: "React Best Practices", content: "Tips for improving React performance." },
    ],
    queries: [
      { query: "How to optimize React apps?", date: "2024-01-01" },
      { query: "What is the best state management library?", date: "2024-01-05" },
    ],
    codes: [
      "console.log('Hello World');",
      `function greet(name) { return Hello; }`, // Fixed here
    ],
  };

  const [user, setUser] = useState(initialUser);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState(initialUser);

  // Toggle Edit Mode
  const handleEditToggle = () => setEditing(!editing);

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  // Save Changes
  const handleSave = () => {
    setUser(editForm);
    setEditing(false);
  };

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-photo">
          <img src="https://via.placeholder.com/150" alt="User" />
        </div>
        <div className="profile-info">
          {editing ? (
            <>
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleInputChange}
                placeholder="Name"
              />
              <input
                type="text"
                name="role"
                value={editForm.role}
                onChange={handleInputChange}
                placeholder="Role"
              />
              <textarea
                name="bio"
                value={editForm.bio}
                onChange={handleInputChange}
                placeholder="Bio"
              />
              <button className="primary-btn" onClick={handleSave}>
                Save
              </button>
              <button className="secondary-btn" onClick={handleEditToggle}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <h2>{user.name}</h2>
              <p>{user.role}</p>
              <p>{user.bio}</p>
              <button className="primary-btn" onClick={handleEditToggle}>
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>

      {/* Profile Content */}
      <div className="profile-content">
        {/* Basic Information */}
        <div className="profile-card">
          <h3>Basic Information</h3>
          <ul>
            <li>
              <strong>Age:</strong> {user.age}
            </li>
            <li>
              <strong>Years of Experience:</strong> {user.experienceYears}
            </li>
            <li>
              <strong>Phone:</strong> {user.phone}
            </li>
            <li>
              <strong>Location:</strong> {user.location}
            </li>
            <li>
              <strong>Email:</strong> {user.email}
            </li>
            <li>
              <strong>CTC:</strong> {user.ctc}
            </li>
          </ul>
        </div>

        {/* Skills Section */}
        <div className="profile-card">
          <h3>Skills</h3>
          <div className="skills-list">
            {user.skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Posts Section */}
        <div className="profile-card">
          <h3>User Posts</h3>
          <ul>
            {user.posts.map((post, index) => (
              <li key={index}>
                <strong>{post.title}:</strong> {post.content}
              </li>
            ))}
          </ul>
        </div>

        {/* Queries Section */}
        <div className="profile-card">
          <h3>User Queries</h3>
          <ul>
            {user.queries.map((query, index) => (
              <li key={index}>
                <strong>{query.query}</strong> - {query.date}
              </li>
            ))}
          </ul>
        </div>

        {/* Code Snippets Section */}
        <div className="profile-card">
          <h3>Saved Code Snippets</h3>
          <ul>
            {user.codes.map((code, index) => (
              <li key={index}>
                <code>{code}</code>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default User_detail;
