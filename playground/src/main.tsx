import React from "react";
import ReactDOM from "react-dom/client";
import "@brigid-tech/design-system/styles";
import "./index.css";
import App from "./App";
import ToastsPlayground from "./pages/ToastsPlayground";
import ValidationPlayground from "./pages/ValidationPlayground";

function resolvePage() {
  switch (window.location.pathname) {
    case "/playground/toasts":
      return <ToastsPlayground />;
    case "/playground/validation":
      return <ValidationPlayground />;
    default:
      return <App />;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>{resolvePage()}</React.StrictMode>
);
