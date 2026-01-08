import styles from "./index.css?inline";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app.tsx";

const initPluginContainer = () => {
  const shadowHost = document.getElementById("plugin-container");

  if (!shadowHost) return;

  const shadowRoot = shadowHost.attachShadow({ mode: "open" });

  // performance approach
  const adoptedStyle = new CSSStyleSheet();
  adoptedStyle.replaceSync(styles);

  shadowRoot.adoptedStyleSheets = [adoptedStyle];

  // compatibility approach
  // const styleTag = document.createElement("style");
  // styleTag.textContent = styles;

  // shadowRoot.appendChild(styleTag);

  const { price, currency } = shadowHost.dataset;
  if (!price || !currency) return;

  const parsedPrice = parseInt(price);

  if (isNaN(parsedPrice)) {
    console.error("Price is invalid");
    return;
  }

  createRoot(shadowRoot).render(
    <StrictMode>
      <App price={parsedPrice} currency={currency} />
    </StrictMode>
  );
};

initPluginContainer();
