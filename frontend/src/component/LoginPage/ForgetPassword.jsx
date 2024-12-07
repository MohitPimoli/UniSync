import React, { useState } from "react";
import "./ForgetPass.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // To handle button state

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(""); // Reset message before submitting
    setIsSubmitting(true); // Disable submit button during request

    try {
      // Make a POST request to the backend for password reset
      const response = await fetch("http://localhost:5001/auth/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("A reset link has been sent to your email address.");
      } else if (response.status === 404) {
        setMessage("Email not found. Please check and try again.");
      } else {
        setMessage(
          "There was an error processing your request. Please try again."
        );
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false); // Re-enable the submit button
    }
  };

  return (
    <div className="ForgotBody">
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
            disabled={isSubmitting} // Disable input while submitting
          />
          <input
            type="submit"
            value={isSubmitting ? "Sending..." : "Send Reset Link"} // Change button text while submitting
            disabled={isSubmitting} // Disable button while submitting
          />
        </form>
        {message && (
          <div
            className={`message ${
              message.includes("error") || message.includes("Email not found")
                ? "error"
                : "success"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
