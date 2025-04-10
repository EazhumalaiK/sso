import React, { useState } from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "./authConfig";

const App: React.FC = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [userDetails, setUserDetails] = useState<string>("Unknown User");

  const handleLogin = async () => {
    try {
      await instance.loginRedirect(loginRequest);
      const accounts = instance.getAllAccounts();
      console.log("accounts", accounts);
      if (accounts.length > 0) {
        instance.setActiveAccount(accounts[0]); // Set the first account as active
        setUserDetails(accounts[0].username);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = () => {
    instance.logoutRedirect();
  };

  // useEffect(() => {
  //   const initializeMsal = async () => {
  //     try {
  //       if (instance && isAuthenticated) {
  //         const account = instance.getActiveAccount();
  //         if (account) {
  //           setUserDetails(account.username);
  //         } else {
  //           console.warn("No active account found.");
  //           setUserDetails("Unknown User");
  //         }
  //       } else {
  //         setUserDetails("Unknown User");
  //       }
  //     } catch (error) {
  //       console.error("Error initializing MSAL instance:", error);
  //     }
  //   };

  //   initializeMsal();
  // }, [isAuthenticated, instance]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Azure AD SSO with React + TypeScript</h1>
      {isAuthenticated ? (
        <>
          <p>You are logged in!{userDetails}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login with Azure AD 3</button>
      )}
    </div>
  );
};

export default App;
