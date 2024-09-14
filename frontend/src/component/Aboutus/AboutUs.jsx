import React from "react";
import Draggable from "react-draggable";
import "./AboutUs.css"; // Import the external CSS file
import Navbar from "../Navbar/Navbar";
const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="title">About Us</h1>
        <section className="infoSection">
          <p className="text">
            <strong>We are Unisync</strong>
          </p>
        </section>
        <section className="teamSection">
          <h2 className="subtitle">Our Team</h2>
          <div className="teamCards">
            {teamMembers.map((member) => (
              <Draggable key={member.name}>
                <div className="card">
                  <img src={member.photo} alt={member.name} className="photo" />
                  <div className="cardHeader">
                    <h3 className="cardTitle">{member.name}</h3>
                  </div>
                  <p className="cardRole">{member.role}</p>
                  <p className="cardDescription">{member.description}</p>
                </div>
              </Draggable>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

// Example team members with local image paths
const teamMembers = [
  {
    name: "Nikhil Singh Bisht",
    role: "Lead Developer",
    description:
      "Expert in backend technologies with a passion for solving complex problems.",
    photo: "/images/nikhil.jpg",
  },
  {
    name: "Hardik Pant",
    role: "Backend Developer",
    description:
      "Specializes in building scalable backend systems and ensuring smooth integrations.",
    photo: "/images/hardik.jpg",
  },
  {
    name: "Mohit Pimoli",
    role: "Frontend Developer",
    description:
      "Focused on creating intuitive and user-friendly interfaces for a seamless user experience.",
    photo: "/images/mohit.jpg",
  },
  {
    name: "Yash Garg",
    role: "UI/UX Designer",
    description:
      "Dedicated to designing visually appealing and functional user interfaces with a strong focus on user experience.",
    photo: "/images/yash.jpg",
  },
];

export default AboutUs;
