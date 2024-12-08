import React, { createContext, useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode"; // For decoding the JWT
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  token: null,
  user: null, // Add user state to store profile data
  login: (token, user) => {},
  logout: () => {},
  isLoading: false,
  setLoading: (state) => {},
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null); // State to store user profile data
  const [isLoading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();
  const logoutTimeoutRef = useRef(null); // To store the timeout ID

  // Function to handle logout
  const logout = () => {
    setToken(null);
    setUser(null);
    setLoading(false); // Clear user data on logout
    localStorage.removeItem("authToken");
    navigate("/login"); // Redirect to login on logout
  };

  // Function to fetch user data after login
  const fetchUserData = async (authToken) => {
    try {
      const response = await fetch("http://localhost:5001/get/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User data fetched:", data);
        setUser(data);
        setLoading(false);
      } else {
        logout();
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      logout();
    }
  };

  // Function to schedule auto-logout based on token expiration
  const scheduleLogout = (authToken) => {
    const decoded = jwtDecode(authToken);
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
    setLoading(true);
    localStorage.setItem("authToken", newToken);
    scheduleLogout(newToken);
    fetchUserData(newToken); // Fetch user data after login
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
      setLoading(true);
      scheduleLogout(storedToken);
      fetchUserData(storedToken); // Fetch user data on initial load if token exists
    } else {
      setLoading(false); // Stop loading if no token is found
    }

    return () => {
      if (logoutTimeoutRef.current) {
        clearTimeout(logoutTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user, // Provide user data via context
        login,
        logout,
        isLoading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
