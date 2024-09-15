import React from 'react';
import { FaGoogle, FaLinkedinIn } from "react-icons/fa";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const SocialContainer = () => {
  const navigate = useNavigate();  // Initialize the useNavigate hook

  const handleGoogleSuccess = (credentialResponse) => {
    console.log('Google OAuth Success:', credentialResponse);
    // Send the credential to your backend for verification
    // Once verified, redirect to the landing page
    navigate('/');  // Redirect to your landing page
  };

  const handleGoogleFailure = (error) => {
    console.error('Google OAuth Failure:', error);
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="social-container">
        {/* Google Login Button */}
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
          render={({ onClick }) => (
            <a onClick={onClick} className="social">
              <FaGoogle />
            </a>
          )}
        />

        {/* LinkedIn Icon (You can integrate LinkedIn OAuth similarly) */}
        <a href="https://www.linkedin.com/" className="social">
          <FaLinkedinIn />
        </a>
      </div>
    </GoogleOAuthProvider>
  );
};

export default SocialContainer;
