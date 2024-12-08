import React, { useEffect, useState } from "react";
import "./Notification.css";
import Navbar from '../Navbar/Navbar'
const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching notifications (replace with actual API call later)
  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        // Simulated backend call using setTimeout
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              {
                id: 1,
                name: "John Doe",
                action: "reacted to your post",
                message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
                time: "10 mins ago",
                profileImage: "https://via.placeholder.com/50",
                postImage: "https://via.placeholder.com/40",
              },
              {
                id: 2,
                name: "Richard Miles",
                action: "liked your post",
                message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
                time: "15 mins ago",
                profileImage: "https://via.placeholder.com/50",
                postImage: "https://via.placeholder.com/40",
              },
              // Add more dynamic data here
            ]);
          }, 1000);
        });
        setNotifications(response);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
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