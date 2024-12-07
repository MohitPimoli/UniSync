import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Ensure axios is imported
import SocialContainer from "./SocialContainer";
import { AuthContext } from "../../context/AuthContext";

const FormContainer = () => {
  const [name, setName] = useState("");
  const [usernameSignup, setUsernameSignup] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupMessages, setSignupMessages] = useState([]);
  const [isSignupSubmitting, setIsSignupSubmitting] = useState(false);

  const [usernameLogin, setUsernameLogin] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [isLoginSubmitting, setIsLoginSubmitting] = useState(false);

  const { login, isLoading, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSignupMessages([]);
    setIsSignupSubmitting(true);

    if (password !== confirmPassword) {
      setSignupMessages(["Passwords do not match!"]);
      setLoading(false);
      setIsSignupSubmitting(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/auth/register", {
        name,
        username: usernameSignup,
        email,
        confirmPassword,
      });

      if (response.status === 201 || response.status === 200) {
        setSignupMessages(["Registration successful!"]);
        setTimeout(() => {
          setSignupMessages([]);
          const signInButton = document.getElementById("signIn");
          if (signInButton) {
            signInButton.click();
          }
        }, 1500);
      } else {
        const errorMessages = response.data.errors
          ? response.data.errors.map((err) => err.msg)
          : [response.data.message || "Registration failed!"];
        setSignupMessages(errorMessages);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = error.response.data.errors.map((err) => err.msg);
        setSignupMessages(errorMessages);
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setSignupMessages([error.response.data.message]);
      } else {
        setSignupMessages(["An error occurred. Please try again."]);
      }
    } finally {
      setIsSignupSubmitting(false);
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginMessage("");
    setIsLoginSubmitting(true);

    try {
      const response = await axios.post("http://localhost:5001/auth/login", {
        username: usernameLogin,
        password: loginPassword,
      });

      if (response.status === 200) {
        login(response.data.token);

        setLoginMessage("Login successful!");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        const errorMsg = response.data.message || "Login failed!";
        setLoginMessage(errorMsg);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setLoginMessage(error.response.data.message);
      } else {
        setLoginMessage("An error occurred. Please try again.");
      }
    } finally {
      setIsLoginSubmitting(false);
      setLoading(false);
    }
  };
  if (isLoading) {
    return (
      <div className="loading-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      {/* Signup Container */}
      <div className="form-container sign-up-container">
        <form onSubmit={handleSignup}>
          <h1>Create Account</h1>
          <SocialContainer /> {/* Google OAuth Buttons */}
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

      {/* Login Container */}
      <div className="form-container sign-in-container">
        <form onSubmit={handleLogin}>
          <h1>Sign in</h1>
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
          <span>---------- OR CONNECT WITH ----------</span>
          <SocialContainer /> {/* Google OAuth Buttons */}
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
