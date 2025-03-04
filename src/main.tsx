import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "app/app";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "app/store/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </StrictMode>,
);
