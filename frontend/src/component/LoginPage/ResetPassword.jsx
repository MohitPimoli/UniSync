import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ResetPassword.css";

const ResetPassword = () => {
  const { token } = useParams(); // Retrieve token from URL
  const [newPassword, setNewPassword] = useState(""); // State to hold new password
  const [message, setMessage] = useState(""); // State to hold feedback message
  const [error, setError] = useState(""); // State to hold error message
  const [isSubmitting, setIsSubmitting] = useState(false); // State for form submission status
  const navigate = useNavigate();

  // Password change handler
  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
    setError(""); // Clear error message on input change
  };

  // Password reset form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    // Basic validation (you can extend this as needed)
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setIsSubmitting(true); // Disable the button after submission

    try {
      const response = await fetch("http://localhost:5001/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }), // Send token and new password
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(
          result.message || "Your password has been successfully reset."
        );
        setTimeout(() => {
          navigate("/login"); // Redirect to login after successful reset
        }, 1500);
      } else {
        // Handle errors based on status codes
        if (response.status === 400) {
          setError(result.message || "The link is invalid or has expired.");
        } else if (response.status === 404) {
          setError("User with this email does not exist.");
        } else {
          setError("Failed to reset password. Please try again later.");
        }
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false); // Re-enable button after operation
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="newPassword"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={handlePasswordChange}
          required
        />
        <input
          type="submit"
          value={isSubmitting ? "Resetting..." : "Reset Password"}
          disabled={isSubmitting}
        />
      </form>
      {error && <div className="error">{error}</div>}
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default ResetPassword;
