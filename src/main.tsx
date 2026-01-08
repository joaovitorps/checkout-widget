import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app.tsx";

try {
  const element = document.getElementById("plugin-container");

  let priceNumber: number = parseInt(element?.dataset.price || "0", 10);
  let currency: string = element?.dataset.currency || "EUR";

  createRoot(element!).render(
    <StrictMode>
      <App price={priceNumber} currency={currency} />
    </StrictMode>
  );
} catch (error) {
  console.error("checkout-widget-error:", error);
}
