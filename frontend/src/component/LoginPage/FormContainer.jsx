import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SocialContainer from "./SocialContainer";

const FormContainer = () => {
  // State for Signup
  const [name, setName] = useState("");
  const [usernameSignup, setUsernameSignup] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupMessages, setSignupMessages] = useState([]);
  const [isSignupSubmitting, setIsSignupSubmitting] = useState(false);

  // State for Login
  const [usernameLogin, setUsernameLogin] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [isLoginSubmitting, setIsLoginSubmitting] = useState(false);
  const navigate = useNavigate();
  // Signup Handler
  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupMessages([]);
    setIsSignupSubmitting(true);

    if (password !== confirmPassword) {
      setSignupMessages(["Passwords do not match!"]);
      setIsSignupSubmitting(false);
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
          CnfPassword: password, // Ensure this matches the backend
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
        const errorMessages = data.errors
          ? data.errors.map((err) => err.msg)
          : [data.message || "Registration failed!"];
        setSignupMessages(errorMessages);
      }
    } catch (error) {
      setSignupMessages(["An error occurred. Please try again."]);
    } finally {
      setIsSignupSubmitting(false);
    }
  };

  // Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginMessage("");
    setIsLoginSubmitting(true);

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
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setLoginMessage(data.message || "Login failed!");
      }
    } catch (error) {
      setLoginMessage("An error occurred. Please try again.");
    } finally {
      setIsLoginSubmitting(false);
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
            value={confirmPassword}
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
          <button type="submit" disabled={isSignupSubmitting}>
            {isSignupSubmitting ? "Signing Up..." : "Sign Up"}
          </button>
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
          <button type="submit" disabled={isLoginSubmitting}>
            {isLoginSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </>
  );
};

export default FormContainer;
