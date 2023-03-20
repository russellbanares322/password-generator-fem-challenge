import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        duration: 2000,
        success: {
          iconTheme: {
            primary: "#A4FFAF",
            secondary: "#111016",
          },
          style: {
            background: "#24232B",
            color: "#DEDDE5",
            fontWeight: "400",
          },
        },
        error: {
          iconTheme: {
            primary: "#CB2727",
            secondary: "#111016",
          },
          style: {
            background: "#24232B",
            color: "#DEDDE5",
            fontWeight: "400",
          },
        },
      }}
    />
  </React.StrictMode>
);
