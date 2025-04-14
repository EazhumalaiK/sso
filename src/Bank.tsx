import { useMsal } from "@azure/msal-react";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const Bank = () => {
  const [num1, setNum1] = useState<string>("0");
  const [num2, setNum2] = useState<string>("0");
  const [result, setResult] = useState<number>(0);
  // const [username, setUsername] = useState<string>("k.eazhumalai"); // Replace with actual username logic if needed
  //
  const navigate = useNavigate();

  // Calculator function
  const handleAddition = () => {
    const parsedNum1 = parseFloat(num1) || 0;
    const parsedNum2 = parseFloat(num2) || 0;
    setResult(parsedNum1 + parsedNum2);
  };
  const { accounts } = useMsal();
  const username = useMemo(
    () => (accounts.length > 0 ? accounts[0].username : "Guest"),
    [accounts]
  );

  console.log("username layout comp", username);

  // useNavigateBasedOnApi logic
  useEffect(() => {
    console.log("useNavigateBasedOnApi username:", username); // Log the username for debugging

    if (!username) {
      console.error("Username is empty or undefined. Skipping API call.");
      return;
    }

    const fetchData = async () => {
      console.log("Fetching data for username:", username); // Log the username for debugging
      try {
        const url = `https://ssocheck100-sandbox.mxapps.io/rest/myservice/v1/accountsso/${username}`;
        console.log("API URL:", url); // Log the URL for debugging

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        });

        console.log("Raw response:", response); // Log the raw response

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API response data:", data); // Log the API response data

        if (data.userid === "1") {
          navigate("/bank"); // Navigate to 'bank' component
        } else {
          navigate("/realestate"); // Navigate to 'realestate' component
        }
      } catch (error) {
        console.error("API call failed:", error);
      }
    };

    fetchData();
  }, [username, navigate]);

  return (
    <div>
      <h1>Math Calculator</h1>
      <div>
        <input
          type="number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          placeholder="Enter first number"
        />
        <input
          type="number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          placeholder="Enter second number"
        />
        <button onClick={handleAddition}>Add</button>
      </div>
      <h2>Result: {result}</h2>
    </div>
  );
};

export default Bank;
