import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";

const Login: React.FC = () => {
  const [showInput, setShowInput] = useState(false);
  const [username, setUsername] = useState("");
  const { instance } = useMsal();

  const handleLoginClick = () => {
    setShowInput(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSSO = async () => {
    try {
      await instance.loginRedirect(loginRequest); // Initiates Azure SSO
    } catch (error) {
      console.error("SSO Login failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login Page</h2>

        {showInput && (
          <div className="mb-4">
            <input
              type="text"
              value={username}
              onChange={handleInputChange}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleLoginClick}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
          <button
            onClick={handleSSO}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
          >
            Login SSO
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
