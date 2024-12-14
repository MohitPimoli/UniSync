import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useContext } from "react";
import Navbar from "../Navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import "./ConnectionReqs.css";
import { Avatar } from "@mui/material";
import { PersonAdd, Close } from "@mui/icons-material";
import "./ConnectionReqs.css";
import axios from "axios";
import io from "socket.io-client";

const ConnectionRequests = () => {
  const [requests, setRequests] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const { authToken } = useContext(AuthContext);
  const socket = useMemo(() => io("http://localhost:5001"), []);

  const fetchRequests = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/connections/requests",
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Replace with your auth token
          },
        }
      );
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching connection requests:", error);
    }
  }, [authToken]);

  const fetchSuggestions = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/connections/suggestions",
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Replace with your auth token
          },
        }
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching friend suggestions:", error);
    }
  }, [authToken]);

  useEffect(() => {
    fetchRequests();
    fetchSuggestions();

    socket.on("connectionRequestSent", (data) => {
      console.log("New connection request data:", data);
      fetchRequests();
    });

    socket.on("connectionRequestAccepted", (data) => {
      console.log("New connection request data:", data);
      fetchRequests();
      fetchSuggestions();
    });

    socket.on("connectionRequestRejected", (data) => {
      console.log("New connection request data:", data);
      fetchRequests();
    });

    return () => {
      socket.disconnect();
    };
  }, [fetchRequests, fetchSuggestions, socket]);

  const handleAccept = async (requestId) => {
    try {
      await axios.post(
        "http://localhost:5001/connections/accept-request",
        { requesterId: requestId },
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Replace with your auth token
          },
        }
      );
      fetchRequests();
      fetchSuggestions();
    } catch (error) {
      console.error("Error accepting connection request:", error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await axios.post(
        "http://localhost:5001/connections/reject-request",
        { requesterId: requestId },
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Replace with your auth token
          },
        }
      );
      fetchRequests();
    } catch (error) {
      console.error("Error rejecting connection request:", error);
    }
  };

  const handleAddFriend = async (suggestionId) => {
    try {
      await axios.post(
        "http://localhost:5001/connections/send-request",
        { receiverId: suggestionId },
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Replace with your auth token
          },
        }
      );
      fetchSuggestions();
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  return (
    <>
      <Navbar requestCount={requests.length} />
      <div className="container">
        <h2 className="title">Network</h2>
        <div className="cards-container">
          <div className="left-section">
            <h3 className="section-title">Connection Requests</h3>
            {requests.map((request) => (
              <div className="card" key={request._id}>
                <div className="card-material">
                  <Avatar src={request.requesterId.avatar} className="avatar" />
                  <div className="card-info">
                    <h3 className="card-name">{request.requesterId.name}</h3>
                    <p className="card-title">{request.requesterId.title}</p>
                  </div>
                  <div className="card-actions">
                    <button
                      className="accept-btn"
                      onClick={() => handleAccept(request.requesterId._id)}
                    >
                    <span>  <PersonAdd fontSize="inherit" /> Accept </span>
                    </button>
                    <button
                      className="ignore-btn"
                      onClick={() => handleReject(request.requesterId._id)}
                    >
                    <span> <Close fontSize="inherit" /> Ignore </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="right-section">
            <h3 className="section-title">Suggestions</h3>
            {suggestions.map((suggestion) => (
              <div className="card" key={suggestion._id}>
                <div className="card-material">
                  <Avatar src={suggestion.avatar} className="avatar" />
                  <div className="card-info">
                    <h3 className="card-name">{suggestion.name}</h3>
                    <p className="card-title">{suggestion.title}</p>
                  </div>
                  <div className="card-actions">
                    <button
                      className="accept-btn1"
                      onClick={() => handleAddFriend(suggestion._id)}
                    >
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