import { expect, test, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { App } from "./app";
import * as api from "./api";

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

  // can use userEvent from @testing-library/user-event
  // as it simulate an actual mouse click
  // not only send a DOM event
  fireEvent.click(paymentButton);
  expect(paymentButton).toHaveTextContent(/^Loading...$/);
  expect(paymentButton).toBeDisabled();
});

test("check result payment success", async () => {
  const spy = vi
    .spyOn(api, "apiCall")
    .mockImplementation(() => Promise.resolve(1));

  render(<App price={5500} currency="EUR" />);
  const paymentButton = screen.getByRole("button", {
    name: "Pay €55.00",
  });

  fireEvent.click(paymentButton);

  expect(spy).toHaveBeenCalled();
});

test("check result payment fail", async () => {
  const spy = vi
    .spyOn(api, "apiCall")
    .mockRejectedValue(new Error("Blocked by test"));

  render(<App price={5500} currency="EUR" />);
  const paymentButton = screen.getByRole("button", {
    name: "Pay €55.00",
  });

  fireEvent.click(paymentButton);

  expect(spy).toHaveBeenCalled();

  const spanError = await screen.findByRole("alert");

  expect(spanError).toHaveTextContent(
    "We were unable to fulfill the payment now, please try again in a few minutes"
  );
  expect(spanError).toAppearAfter(paymentButton);

  expect(paymentButton).not.toBeDisabled();
});
