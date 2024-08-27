import React, { useState } from "react";
import SocialContainer from "./SocialContainer";

const FormContainer = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [CnfPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(""); // State to manage the success message

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== CnfPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    const response = await fetch("http://localhost:5001/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        username,
        email,
        CnfPassword,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage("Registration successful!");
      setTimeout(() => {
        setMessage("");
        document.getElementById("signIn").click(); // Trigger the redirect to sign-in
      }, 1500); // Redirect after 1.5 seconds
    } else {
      setMessage(data.message || "Registration failed!");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Login successful!");
    } else {
      alert(data.message || "Login failed!");
    }
  };

  return (
    <>
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
            placeholder="UserName"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          {message && <p>{message}</p>}{" "}
          {/* Display the success or error message here */}
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form onSubmit={handleLogin}>
          <h1>Sign in</h1>
          <SocialContainer />
          <span>or use your account</span>
          <input
            type="text"
            placeholder="UserName"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <a href="\forget">Forgot your password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>
    </>
  );
};

export default FormContainer;
