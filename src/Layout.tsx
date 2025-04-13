import React from "react";
import { useMsal } from "@azure/msal-react";
import useNavigateBasedOnApi from "./useNavigateBasedOnApi";

import Footer from "./Footer";
import Header from "./Header";

const Layout: React.FC = () => {
  const { accounts } = useMsal();
  const username = accounts.length > 0 ? accounts[0].username : "Guest";

  // Use the custom hook
  useNavigateBasedOnApi(username);

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
