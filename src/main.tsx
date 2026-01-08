import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app.tsx";

const initPluginContainer = () => {
  const element = document.getElementById("plugin-container");

  if (!element) {
    console.error("checkout-widget not loaded");
    return;
  }

  const { price = "0", currency = "EUR" } = element.dataset;

  const parsedPrice = parseInt(price);

  if (isNaN(parsedPrice)) {
    console.error("Price is invalid");
    return;
  }

  createRoot(element).render(
    <StrictMode>
      <App price={parsedPrice} currency={currency} />
    </StrictMode>
  );
};

initPluginContainer();
