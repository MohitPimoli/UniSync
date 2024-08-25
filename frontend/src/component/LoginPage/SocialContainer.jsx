import React from 'react';
import { FaGoogle , FaLinkedinIn} from "react-icons/fa";
const SocialContainer = () => {
  return (
    <div className="social-container">
      
      <a href="#" className="social"><FaGoogle /></a>
      <a href="#" className="social"><FaLinkedinIn /></a>
      {/* <a href="#" className="social"></a> */}
    </div>
  );
};

export default SocialContainer;
