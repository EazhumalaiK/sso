import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";

import Login from "./Login";
import Layout from "./Layout";
import { useMemo } from "react";
import RealEstate from "./RealEstate";
import "./Popup.css";
import Bank from "./Bank";
const SESSION_TIMEOUT = 3 * 60 * 1000; // 3 minutes
const REFRESH_TOKEN_TIME = 2 * 60 * 1000; // 2 minutes
const INACTIVITY_WARNING_TIME = 1 * 60 * 1000; // 1 minute

const App: React.FC = () => {
  const { instance, accounts } = useMsal();
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [showPopup, setShowPopup] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const isAuthenticatedMemoized = useMemo(
    () => isAuthenticated,
    [isAuthenticated]
  );

  useEffect(() => {
    const handleActivity = () => setLastActivity(Date.now());

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);

    const interval = setInterval(() => {
      const timeSinceLastActivity = Date.now() - lastActivity;

      if (
        timeSinceLastActivity > INACTIVITY_WARNING_TIME &&
        timeSinceLastActivity <= SESSION_TIMEOUT
      ) {
        setShowPopup(true); // Show popup after 5 minutes of inactivity
      } else if (timeSinceLastActivity > SESSION_TIMEOUT) {
        console.log("Session timed out. Logging out...");
        instance.logoutRedirect();
      }
    }, 1000);

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      clearInterval(interval);
    };
  }, [lastActivity, instance]);

  useEffect(() => {
    const refreshToken = async () => {
      if (isAuthenticatedMemoized && accounts.length > 0) {
        try {
          const response = await instance.acquireTokenSilent({
            scopes: ["User.Read"], // Replace with your app's scopes
            account: accounts[0],
          });
          console.log("Token refreshed successfully:", response.accessToken);
        } catch (error) {
          if (error instanceof InteractionRequiredAuthError) {
            console.log(
              "Silent token acquisition failed, requiring interaction."
            );
            instance.acquireTokenRedirect({
              scopes: ["User.Read"], // Replace with your app's scopes
            });
          } else {
            console.error("Token refresh error:", error);
          }
        }
      }
    };

    const interval = setInterval(refreshToken, REFRESH_TOKEN_TIME); // Refresh token every 5 minutes
    return () => clearInterval(interval); // Cleanup on unmount
  }, [isAuthenticatedMemoized, accounts, instance]);

  const handlePopupClose = () => {
    setShowPopup(false);
    setLastActivity(Date.now()); // Reset activity timer
  };

  if (isAuthenticatedMemoized === undefined) {
    return <div>Loading...</div>;
  }
  if (isAuthenticatedMemoized === true) {
    console.log("Authenticated being called line 83");
    console.log("isAuthenticated:", isAuthenticated);
    console.log("isAuthenticatedMemoized:", isAuthenticatedMemoized);
    return <Layout></Layout>;
  }

  return (
    <>
      {showPopup && (
        <div className="fixed">
          <div className="popup-container">
            <p className="popup-text">
              You have been inactive for a while. Do you want to stay logged in?
            </p>
            <button className="popup-button" onClick={handlePopupClose}>
              Stay Logged In
            </button>
          </div>
        </div>
      )}
      <Routes>
        <Route path="/" element={<Login />}>
  <Route index element={<Bank />} /> // 👈 this is the fix
  <Route path="login" element={<Login />} />
  <Route path="bank" element={<Bank />} />
  <Route path="realestate" element={<RealEstate />} />
  <Route path="*" element={<Navigate to="/login" replace />} />
</Route>
        {/* <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/bank" element={<Bank />} />
          <Route path="/realestate" element={<RealEstate />} />
          {/* <Route
            path="/"
            element={
              isAuthenticatedMemoized ? (
                <Layout />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          /> */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route> */}
      </Routes>
    </>
  );
};

export default App;
