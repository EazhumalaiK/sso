import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useNavigateBasedOnApi = (username: string) => {
  console.log("useNavigateBasedOnApi username line 6:", username); // Log the username for debugging
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useNavigateBasedOnApi username: line10", username); // Log the username for debugging
    // Check if username is not empty or undefined
    if (!username) {
      console.error("Username is empty or undefined. Skipping API call.");
      return;
    }
    const fetchData = async () => {
      console.log("Fetching data for username:", username); // Log the username for debugging
      try {
        const url = `https://ssocheck100-sandbox.mxapps.io/rest/myservice/v1/accountsso/${username}`;
        // Replace with your API endpoint
        console.log("API URL:", url); // Log the URL for debugging
        console.log("Username:", username); // Log the username for debugging
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers if required
            // "Authorization": `Bearer ${token}`, // Example for adding an authorization token
            accept: "application/json",
          },
          // body: JSON.stringify({ username }),
        });
        console.log("Raw response:", response); // Log the raw response

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API response data:", data); // Log the API response data

        if (data.userid === 1) {
          navigate("/bank"); // Navigate to 'bank' component
        } else {
          navigate("/realestate"); // Navigate to 'realestate' component
        }
      } catch (error) {
        console.error("API call failed:", error);
      }
    };

    if (username) {
      fetchData();
    }
  }, [username, navigate]);
};

export default useNavigateBasedOnApi;
