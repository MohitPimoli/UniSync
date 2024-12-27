import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./Notification.css";
import Navbar from "../Navbar/Navbar";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching notifications (replace with actual API call later)
  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5001/notifications", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // const markAsRead = async (id) => {
  //   try {
  //     await fetch(`/notifications/${id}/markAsRead`, {
  //       method: "PUT",
  //       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //     });
  //     setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  //   } catch (err) {
  //     console.error("Error marking notification as read:", err);
  //   }
  // };

  useEffect(() => {
    const socket = io("http://localhost:5001");

    socket.on("notification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <div className="notifications-page">
        <h1 className="notifications-title">
          Notifications <span>🔔</span>
        </h1>
        {loading ? (
          <p>Loading notifications...</p>
        ) : notifications.length > 0 ? (
          <ul className="notifications-list">
            {notifications.map((notification) => (
              <li key={notification.id} className="notification-item">
                <img
                  src={notification.profileImage}
                  alt="profile"
                  className="profile-image"
                />
                <div className="notification-content">
                  <p className="notification-text">
                    <strong>{notification.name}</strong> {notification.action}
                  </p>
                  <p className="notification-message">{notification.message}</p>
                  <span className="notification-time">{notification.time}</span>
                </div>
                <img
                  src={notification.postImage}
                  alt="post"
                  className="post-image12"
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>No notifications available.</p>
        )}
      </div>
    </>
  );
};

export default Notification;
