import React, { useMemo } from "react";
import { useMsal } from "@azure/msal-react";
import useNavigateBasedOnApi from "./useNavigateBasedOnApi";

import Footer from "./Footer";
import Header from "./Header";

const Layout: React.FC = () => {
  const { accounts } = useMsal();
  const username = useMemo(
    () => (accounts.length > 0 ? accounts[0].username : "Guest"),
    [accounts]
  );

  console.log("username layout comp", username);

  // Use the custom hook
  useNavigateBasedOnApi(username);

  console.log("Layout component rendered 16");

  // const handleLogout = () => {
  //   instance.logoutRedirect();
  // };

  return (
    <div>
      <Header />
      <main></main>
      <Footer />
    </div>
  );
};

export default Layout;
