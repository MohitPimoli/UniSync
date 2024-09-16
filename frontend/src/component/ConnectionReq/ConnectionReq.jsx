import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";  // Assuming Navbar is in the Navbar folder
import { Avatar } from "@mui/material";
import { PersonAdd, Close } from "@mui/icons-material";
import "./ConnectionReqs.css";

const ConnectionRequests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "John Doe",
      title: "Software Engineer",
      avatar: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Jane Smith",
      title: "Data Scientist",
      avatar: "https://via.placeholder.com/150",
    },
  ]);

  // Simulate real-time connection requests
  useEffect(() => {
    const interval = setInterval(() => {
      const newRequest = {
        id: requests.length + 1,
        name: `User ${requests.length + 1}`,
        title: "New Title",
        avatar: "https://via.placeholder.com/150",
      };
      setRequests((prevRequests) => [...prevRequests, newRequest]);
    }, 10000); // New request every 10 seconds

    return () => clearInterval(interval);
  }, [requests]);

  return (
    <>
      {/* Pass request count to Navbar */}
      <Navbar requestCount={requests.length} />

      <div className="container">
        <h2 className="title">Connection Requests</h2>

        <div className="cards-container">
          {requests.map((request) => (
            <div className="card" key={request.id}>
              <div className="card-material">
                <Avatar src={request.avatar} className="avatar" />
                <div className="card-info">
                  <h3 className="card-name">{request.name}</h3>
                  <p className="card-title">{request.title}</p>
                </div>
                <div className="card-actions">
                  <button className="accept-btn">
                    <PersonAdd fontSize="small" /> Accept
                  </button>
                  <button className="ignore-btn">
                    <Close fontSize="small" /> Ignore
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ConnectionRequests;
