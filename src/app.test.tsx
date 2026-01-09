import { expect, test } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { App } from "./app";

test("renders Button with price and currency", async () => {
  render(<App price={5500} currency="EUR" />);
  const paymentButton = screen.getByRole("button", {
    name: "Pay €55.00",
  });

  expect(paymentButton).toBeInTheDocument();
  expect(paymentButton).not.toBeDisabled();
});

test("show loading message when clicked", async () => {
  render(<App price={5500} currency="EUR" />);
  const paymentButton = screen.getByRole("button", {
    name: "Pay €55.00",
  });

  fireEvent.click(paymentButton);
  expect(paymentButton).toHaveTextContent(/^Loading...$/);
  expect(paymentButton).toBeDisabled();
});
