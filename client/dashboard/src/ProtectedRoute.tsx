import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
// Assuming your axios instance is exported by default from 'src/api/index.ts' or 'src/api.ts'
// The path './api' assumes 'api' is a directory or file in the same 'src' directory as ProtectedRoute.tsx
import api from "./api/axios";

// This function now makes an API call to check the session.
const checkMemberSession = async (): Promise<boolean> => {
  try {
    // Make a GET request to /auth/session
    const response = await api.get("/api/auth/session");
    // Check if response.data.member exists and is truthy
    // Adjust 'response.data.member' if your server response structure is different
    return !!(response.data && response.data.member);
  } catch (error) {
    console.error("Authentication session check failed:", error);
    // In case of an error (e.g., network issue, server error), treat as not authenticated
    return false;
  }
};

const ProtectedRoute: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null indicates loading state
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyAuthStatus = async () => {
      setIsLoading(true);
      const memberStatus = await checkMemberSession();
      setIsAuthenticated(memberStatus);
      setIsLoading(false);
    };

    verifyAuthStatus();
  }, []); // Empty dependency array ensures this runs once on component mount

  if (isLoading || isAuthenticated === null) {
    // Render a loading indicator or null while checking session
    // You can replace this with a more sophisticated loading spinner
    return <div>Loading session...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to the home page (e.g., '/') if not authenticated.
    // Ensure you have a route defined for '/' (e.g., a login page or public home).
    window.location.href = "/";
  }

  return <Outlet />; // If authenticated, render the child routes (i.e., AppLayout and its children)
};

export default ProtectedRoute;
