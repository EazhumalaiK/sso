import { useEffect, useRef } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";

const INACTIVITY_TIMEOUT_MS = 14 * 60 * 1000; // 14 minutes
const ABSOLUTE_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes
const SILENT_REFRESH_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes

const SessionManager: React.FC = () => {
  const { instance } = useMsal();

  const activityTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const absoluteTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const refreshIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );

  const logout = (reason: string) => {
    console.log(`Logging out due to: ${reason}`);
    instance.logoutRedirect();
  };

  const resetInactivityTimer = () => {
    if (activityTimeoutRef.current) clearTimeout(activityTimeoutRef.current);
    activityTimeoutRef.current = setTimeout(
      () => logout("Inactivity"),
      INACTIVITY_TIMEOUT_MS
    );
  };

  const setupActivityListeners = () => {
    const activityEvents = ["mousemove", "keydown", "click"];
    const reset = () => resetInactivityTimer();

    activityEvents.forEach((event) => window.addEventListener(event, reset));

    return () => {
      activityEvents.forEach((event) =>
        window.removeEventListener(event, reset)
      );
    };
  };

  const setupSilentTokenRefresh = () => {
    refreshIntervalRef.current = setInterval(() => {
      console.log("Attempting silent token refresh...");
      instance
        .acquireTokenSilent(loginRequest)
        .then((response) => {
          console.log(
            "Token refreshed at",
            new Date(),
            response.account?.username
          );
        })
        .catch((error) => {
          console.warn("Silent token refresh failed:", error);
          logout("Silent token refresh failed");
        });
    }, SILENT_REFRESH_INTERVAL_MS);
  };

  const startAbsoluteTimeout = () => {
    absoluteTimeoutRef.current = setTimeout(
      () => logout("Absolute session timeout"),
      ABSOLUTE_TIMEOUT_MS
    );
  };

  useEffect(() => {
    resetInactivityTimer();
    const removeListeners = setupActivityListeners();
    setupSilentTokenRefresh();
    startAbsoluteTimeout();

    return () => {
      if (activityTimeoutRef.current) clearTimeout(activityTimeoutRef.current);
      if (absoluteTimeoutRef.current) clearTimeout(absoluteTimeoutRef.current);
      if (refreshIntervalRef.current) clearInterval(refreshIntervalRef.current);
      removeListeners();
    };
  }, []);

  return null;
};

export default SessionManager;
