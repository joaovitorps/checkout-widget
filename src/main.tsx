import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app.tsx";

try {
  const element = document.getElementById("plugin-container");

  let price: unknown = element?.dataset.price;
  let priceNumber: number = price as number;

  if (!element?.dataset.currency) {
    throw new Error("Currency not found");
  }

  let currency: string = element?.dataset.currency;

  console.log(element?.dataset);

  createRoot(element!).render(
    <StrictMode>
      <App price={priceNumber} currency={currency} />
    </StrictMode>
  );
} catch (error) {
  console.error("checkout-widget-error:", error);
}
