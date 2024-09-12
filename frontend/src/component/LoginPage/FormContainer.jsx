import React, { useState } from "react";
import SocialContainer from "./SocialContainer";

const FormContainer = () => {
  // State for Signup
  const [name, setName] = useState("");
  const [usernameSignup, setUsernameSignup] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [CnfPassword, setConfirmPassword] = useState("");
  const [signupMessages, setSignupMessages] = useState([]); // Array for signup messages

  // State for Login
  const [usernameLogin, setUsernameLogin] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState(""); // State for login message

  // Signup Handler
  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== CnfPassword) {
      setSignupMessages(["Passwords do not match!"]);
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username: usernameSignup,
          email,
          CnfPassword,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSignupMessages(["Registration successful!"]);
        setTimeout(() => {
          setSignupMessages([]);
          document.getElementById("signIn").click(); // Redirect to sign-in form
        }, 1500);
      } else {
        // If there are validation errors, display them
        const errorMessages = data.errors
          ? data.errors.map((err) => err.msg)
          : [data.message || "Registration failed!"];
        setSignupMessages(errorMessages);
      }
    } catch (error) {
      setSignupMessages(["An error occurred. Please try again."]);
    }
  };

  // Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameLogin,
          password: loginPassword,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setLoginMessage("Login successful!");
      } else {
        setLoginMessage(data.message || "Login failed!");
      }
    } catch (error) {
      setLoginMessage("An error occurred. Please try again.");
    }
  };

  return (
    <>
      {/* Sign-Up Form */}
      <div className="form-container sign-up-container">
        <form onSubmit={handleSignup}>
          <h1>Create Account</h1>
          <SocialContainer />
          <span>or use your email for registration</span>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={usernameSignup}
            onChange={(e) => setUsernameSignup(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter new Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm your Password"
            value={CnfPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {signupMessages.length > 0 && (
            <div>
              {signupMessages.map((msg, index) => (
                <p key={index} style={{ color: "red" }}>
                  {msg}
                </p>
              ))}
            </div>
          )}
          <button type="submit">Sign Up</button>
        </form>
      </div>

      {/* Sign-In Form */}
      <div className="form-container sign-in-container">
        <form onSubmit={handleLogin}>
          <h1>Sign in</h1>
          <SocialContainer />
          <span>or use your account</span>
          <input
            type="text"
            placeholder="Username"
            value={usernameLogin}
            onChange={(e) => setUsernameLogin(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
          />
          <a href="/forget">Forgot your password?</a>
          {loginMessage && <p>{loginMessage}</p>}
          <button type="submit">Sign In</button>
        </form>
      </div>
    </>
  );
};

export default FormContainer;
