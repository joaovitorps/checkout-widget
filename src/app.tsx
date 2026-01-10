import { useRef, useState } from "react";
import { apiCall } from "./api";

interface CmsDataProps {
  price: number;
  currency: string;
}

const formattedCurrency = ({ price, currency }: CmsDataProps) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currency,
  }).format(price / 100);
};

export const App = ({ price, currency }: CmsDataProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handlePayment = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    await apiCall()
      .then(() => {
        if (buttonRef.current) {
          buttonRef.current.dispatchEvent(
            new CustomEvent("payment-success", {
              // makes it 'bubbles' up to parent DOM elements
              bubbles: true,
              // allow event to cross the shadow DOM boundary
              composed: true,
              detail: {
                price,
                currency,
              },
            })
          );
        }
      })
      .catch((error) => {
        const msg = error instanceof Error ? error.message : "Unknown Error";

        console.error("Payment failed:", msg);

        setErrorMessage(
          "We were unable to fulfill the payment now, please try again in a few minutes"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <button ref={buttonRef} onClick={handlePayment} disabled={isLoading}>
        {isLoading
          ? "Loading..."
          : `Pay ${formattedCurrency({ price, currency })}`}
      </button>
      {errorMessage && (
        <span
          role="alert"
          style={{ display: "inline-block", color: "red", marginTop: ".5rem" }}
        >
          {errorMessage}
        </span>
      )}
    </>
  );
};
