import React, { useState } from "react";
import "./LoginPage.css";
import FormContainer from "../LoginPage/FormContainer";
import OverlayContainer from "../LoginPage/OverlayContainer";
import logo from "../../Photo/Login_Page.png";
function Login() {
  const [RightPanelActive, SetRightPanelActive] = useState(false);

  const handleSignUpClick = () => {
    SetRightPanelActive(true);
  };

  const handleSignInClick = () => {
    SetRightPanelActive(false);
  };

  return (
    <div className="FullBody">
      <img
        style={{
          width: "762px",
          height: "150px",
          borderRadius: "33px",
          padding: "20px",
          marginBottom: "10px",
        }}
        src={logo}
        alt="Logo"
      />
      <div
        className={`container ${RightPanelActive ? "right-panel-active" : ""}`}
        id="container"
      >
        <FormContainer />
        <OverlayContainer
          onSignInClick={handleSignInClick}
          onSignUpClick={handleSignUpClick}
        />
      </div>
    </div>
  );
}

export default Login;
