import React, { useEffect, useState } from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "./authConfig";

const App: React.FC = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [userDetails, setUserDetails] = useState<string>("Unknown User");

  const handleLogin = () => {
    instance.loginRedirect(loginRequest);
  };

  const handleLogout = () => {
    instance.logoutRedirect();
  };

  useEffect(() => {
    if (isAuthenticated) {
      const account = instance.getActiveAccount();
      console.log("account", account);
      setUserDetails(account ? account.username : "Unknown User");
    } else {
      setUserDetails("Unknown User");
    }
  }, [isAuthenticated, instance]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Azure AD SSO with React + TypeScript</h1>
      {isAuthenticated ? (
        <>
          <p>You are logged in!{userDetails}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login with Azure AD 2</button>
      )}
    </div>
  );
};

export default App;
