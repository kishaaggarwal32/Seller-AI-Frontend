import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const signOut = () => {
    // Clear user session or authentication tokens
    // Reset user-related state
    setUser(null);

    // Redirect to the login page
    navigate("/login");
  };

  // Other authentication-related functions (login, signup, etc.) go here

  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
