// src/component/SocialContainer.jsx

import React, { useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const SocialContainer = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Access login function from AuthContext

  const handleSuccess = async (credentialResponse) => {
    console.log("Google OAuth Success:", credentialResponse);
    try {
      // Send the credential to your backend for verification
      const response = await axios.post("http://localhost:5001/google-login", {
        token: credentialResponse.credential,
      });

      if (response.status === 200) {
        // Assuming backend returns a JWT token
        login(response.data.token);
        navigate("/"); // Redirect to your landing page
      } else {
        console.error("Google OAuth failed:", response.data.message);
        alert("Google OAuth failed. Please try again.");
      }
    } catch (error) {
      console.error("Google OAuth Error:", error);
      alert("An error occurred during Google OAuth. Please try again.");
    }
  };

  const handleError = () => {
    console.error("Google OAuth Failure");
    alert("Google OAuth failed. Please try again.");
  };

  return (
    <div className="social-container">
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} useOneTap />
    </div>
  );
};

export default SocialContainer;
