// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode"; // Changed to named import
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  token: null,
  login: (token) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const logoutTimeoutRef = useRef(null); // To store the timeout ID

  // Function to handle logout
  const logout = () => {
    setToken(null);
    localStorage.removeItem("authToken");
    navigate("/login"); // Redirect to login on logout
  };

  // Function to schedule auto-logout based on token expiration
  const scheduleLogout = (currentToken) => {
    const decoded = jwtDecode(currentToken);
    const expirationTime = decoded.exp * 1000 - 60000; // 1 minute before expiration
    const timeUntilLogout = expirationTime - Date.now();

    // Clear any existing timeout
    if (logoutTimeoutRef.current) {
      clearTimeout(logoutTimeoutRef.current);
    }

    if (timeUntilLogout > 0) {
      logoutTimeoutRef.current = setTimeout(() => {
        logout();
        alert("Session expired. Please log in again.");
      }, timeUntilLogout);
    } else {
      // Token already expired
      logout();
    }
  };

  // Function to handle login
  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("authToken", newToken);
    scheduleLogout(newToken);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
      scheduleLogout(storedToken);
    }

    return () => {
      if (logoutTimeoutRef.current) {
        clearTimeout(logoutTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
