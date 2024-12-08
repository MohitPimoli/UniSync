import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { Avatar } from "@mui/material";
import { PersonAdd, Close } from "@mui/icons-material";
import "./ConnectionReqs.css";

const ConnectionRequests = () => {
  const [requests, setRequests] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const fetchRequests = async () => {
    // Simulate fetching connection requests
    const response = [
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
    ];
    setRequests(response);
  };

  const fetchSuggestions = async () => {
    // Simulate fetching friend suggestions
    const response = [
      {
        id: 3,
        name: "Michael Johnson",
        title: "Product Manager",
        avatar: "https://via.placeholder.com/150",
      },
      {
        id: 4,
        name: "Emily Davis",
        title: "Graphic Designer",
        avatar: "https://via.placeholder.com/150",
      },
    ];
    setSuggestions(response);
  };

  useEffect(() => {
    fetchRequests();
    fetchSuggestions();
  }, []);

  return (
    <>
      <Navbar requestCount={requests.length} />
      <div className="container">
        <h2 className="title">Network</h2>
        <div className="cards-container">
          <div className="left-section">
            <h3 className="section-title">Connection Requests</h3>
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
          <div className="right-section">
            <h3 className="section-title">Suggestions</h3>
            {suggestions.map((suggestion) => (
              <div className="card" key={suggestion.id}>
                <div className="card-material">
                  <Avatar src={suggestion.avatar} className="avatar" />
                  <div className="card-info">
                    <h3 className="card-name">{suggestion.name}</h3>
                    <p className="card-title">{suggestion.title}</p>
                  </div>
                  <div className="card-actions">
                    <button className="accept-btn">
                      <PersonAdd fontSize="small" /> Add Friend
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectionRequests;
