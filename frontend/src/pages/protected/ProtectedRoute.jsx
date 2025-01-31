// // src/components/ProtectedRoute.js
// import React from "react";
// import { Route, Navigate, useLocation } from "react-router-dom";

// const ProtectedRoute = ({ element: Element, roles, ...rest }) => {
//   const location = useLocation();
//   const userData = JSON.parse(localStorage.getItem("userData"));
//   const token = localStorage.getItem("token");

//   // Check if user is authenticated and has the right role
//   const isAuthenticated = !!token;
//   const userRole = userData ? userData.roles : null;

//   return (
//     <Route
//       {...rest}
//       element={
//         !isAuthenticated ? (
//           <Navigate to="/login" state={{ from: location }} />
//         ) : !roles.includes(userRole) ? (
//           <Navigate to="/unauthorized" state={{ from: location }} />
//         ) : (
//           <Element />
//         )
//       }
//     />
//   );
// };

// export default ProtectedRoute;
