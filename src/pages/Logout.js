import React, { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext"; // Adjust the path as necessary

const Logout = () => {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    logout(); // Call the logout function from AuthContext
  }, [logout]);

  // Redirect to login page after logging out
  return <Navigate to="/login" />;
};

export default Logout;
