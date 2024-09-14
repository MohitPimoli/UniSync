import React from 'react';
import { FaGoogle , FaLinkedinIn} from "react-icons/fa";
const SocialContainer = () => {
  return (
    <div className="social-container">
      
      <a href="https://www.google.com/" className="social"><FaGoogle /></a>
      <a href="https://www.linkedin.com/" className="social"><FaLinkedinIn /></a>
    </div>
  );
};

export default SocialContainer;
