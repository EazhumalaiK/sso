import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useIsAuthenticated } from "@azure/msal-react";

import Login from "./Login";
import Layout from "./Layout";
import Bank from "./Bank";
import RealEstate from "./RealEstate";
// import ProtectedRoute from "./ProtectedRoute"; // Importing the extracted ProtectedRoute component

const App: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();
  console.log("isAuthenticated line 18", isAuthenticated);

  // interface ProtectedRouteProps {
  //   isAuthenticated: boolean;
  //   children: React.ReactNode;
  // }
  console.log("isAuthenticated line 24", isAuthenticated);

  if (isAuthenticated === undefined) {
    console.log("isAuthenticated line 28", isAuthenticated);
    return <div>Loading...</div>; // Show a loading indicator while determining auth state
  }
  if (isAuthenticated === true) {
    console.log("isAuthenticated line 28", isAuthenticated);
    return (
      <div>
        <Layout></Layout>
      </div>
    ); // Show a loading indicator while determining auth state
  }

  console.log("isAuthenticated line 32", isAuthenticated);

  // const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  //   isAuthenticated,
  //   children,
  // }) => {
  //   console.log("ProtectedRoute isAuthenticated:", isAuthenticated);
  //   return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
  // };

  console.log("isAuthenticated line 42", isAuthenticated);

  return (
    <Router>
      <Routes>
        {/* Unprotected Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/bank" element={<Bank />} />
        <Route path="/realestate" element={<RealEstate />} />

        {/* Protected Route */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Layout /> : <Navigate to="/login" replace />
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
