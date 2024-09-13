import React from "react";

const OverlayContainer = ({ onSignInClick, onSignUpClick }) => {
  return (
    <div className="overlay-container">
      <div className="overlay">
        <div className="overlay-panel overlay-left">
          <div  style={{textAlign:"center", paddingRight:"40px"}} ><h1>Welcome Back!</h1>
          <p>To keep connected with us please login with your personal info</p>
          </div>
          
          <button className="ghost" onClick={onSignInClick} id="signIn">
            Sign In
          </button>
        </div>
        <div className="overlay-panel overlay-right">
        <div  style={{textAlign:"center", paddingLeft:"40px"}} >
          <h1>Hello, Friend!</h1>
          <p>Enter your personal details and start your journey with us</p>
          </div>
          <button className="ghost" onClick={onSignUpClick} id="signUp">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverlayContainer;
