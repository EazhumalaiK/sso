import React, { useState, useEffect } from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "./authConfig";

const App: React.FC = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [userDetails, setUserDetails] = useState<string>("Unknown User");

  useEffect(() => {
    console.log(
      "UseEffect Started:",
      isAuthenticated,
      "Current time:",
      new Date().toLocaleTimeString()
    );
    const initializeMsal = () => {
      const account = instance.getActiveAccount();
      console.log("Account:", account);
      console.log("All Accounts:", instance.getAllAccounts());
      console.log("Is Authenticated:", isAuthenticated);
      console.log("Instance:", instance);
      console.log("Login Request:", loginRequest);
      console.log("Redirect URI:", window.location.href);
      console.log("MSAL Config:", instance.getConfiguration());
      console.log("MSAL Instance:", instance);

      if (account) {
        setUserDetails(account.username);
      } else {
        const accounts = instance.getAllAccounts();
        if (accounts.length > 0) {
          instance.setActiveAccount(accounts[0]);
          setUserDetails(accounts[0].username);
        } else {
          setUserDetails("Unknown User");
        }
      }
    };

    console.log(
      "Is Authenticated:",
      isAuthenticated,
      "Current time:",
      new Date().toLocaleTimeString()
    );
    console.log("Instance:", instance);
    if (isAuthenticated) {
      initializeMsal();
    }
  }, [isAuthenticated, instance]);

  const handleLogin = async () => {
    try {
      await instance.loginRedirect(loginRequest);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = () => {
    instance.logoutRedirect();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Azure AD SSO with React + TypeScript</h1>
      {isAuthenticated ? (
        <>
          <p>You are logged in! {userDetails}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login with Azure AD 8</button>
      )}
    </div>
  );
};

export default App;
