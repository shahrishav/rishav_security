// import React, { createContext, useState, useContext, useEffect } from "react";

// // Create the context
// const AuthContext = createContext();

// // Create a provider component
// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Function to log in the user
//   const login = () => setIsAuthenticated(true);

//   // Function to log out the user
//   const logout = () => setIsAuthenticated(false);

//   // Example: check if the user is authenticated (e.g., check local storage)
//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     setIsAuthenticated(!!user);
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use the auth context
// export const useAuth = () => useContext(AuthContext);
