export const msalConfig = {
  auth: {
    clientId: "91195dc8-f148-4856-9d9f-3fa0da96fc51",
    authority:
      "https://login.microsoftonline.com/8ddacd67-cb2c-429e-8a54-89d6c1f47b8b",
    redirectUri: "https://sprightly-pika-c980bd.netlify.app/",
  },
  cache: {
    cacheLocation: "localStorage", // or "sessionStorage"
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["User.Read"],
};
