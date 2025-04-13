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
  console.log("isAuthenticated", isAuthenticated);

  interface ProtectedRouteProps {
    isAuthenticated: boolean;
    children: React.ReactNode;
  }

  if (isAuthenticated === undefined) {
    return <div>Loading...</div>; // Show a loading indicator while determining auth state
  }

  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    isAuthenticated,
    children,
  }) => {
    console.log("ProtectedRoute isAuthenticated:", isAuthenticated);
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
  };

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
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout />
            </ProtectedRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
