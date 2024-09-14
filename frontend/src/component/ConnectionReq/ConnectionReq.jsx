import React, { useEffect, useState } from "react";
import "./ConnectionReqs.css";
import { Avatar } from "@mui/material";
import { PersonAdd, Close } from "@mui/icons-material";
import io from "socket.io-client";
const socket = io("http://localhost:5001");

const ConnectionRequests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "Yash Garg",
      title: "Software Engineer",
      Avatar: "https://randomuser.me/api/portraits",
    },
    {
      id: 2,
      name: "Nikhil Bisht",
      title: "Software Engineer",
      Avatar: "https://randomuser.me/api/portraits",
    },
  ]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/connection-requests"
        );
        const data = await response.json();
        setRequests(data);
      } catch (err) {
        console.error("Failed to fetch requests:", err);
      }
    };

    fetchRequests();
  }, []);

  useEffect(() => {
    socket.on("new-request", (newRequest) => {
      setRequests((prevRequests) => [...prevRequests, newRequest]);
    });

    return () => {
      socket.off("new-request");
    };
  }, []);

  return (
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
  );
};

export default ConnectionRequests;
