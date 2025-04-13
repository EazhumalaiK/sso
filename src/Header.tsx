import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { accounts, instance } = useMsal();
  const username = accounts.length > 0 ? accounts[0].username : "Guest";

  const navigate = useNavigate();

  const handleLogout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: "/", // Redirect to the home page after logout
    });
  };

  return (
    <header>
      <h1>Welcome, {username}</h1>
      <nav>
        <button onClick={() => navigate("/chess")}>Chess</button>
        <button onClick={() => navigate("/football")}>Football</button>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
};

export default Header;
