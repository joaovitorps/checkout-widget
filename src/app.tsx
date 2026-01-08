import { useRef, useState } from "react";

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

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handlePayment = async () => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);

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
  };

  return (
    <button ref={buttonRef} onClick={handlePayment} disabled={isLoading}>
      {isLoading
        ? "Loading..."
        : `Pay ${formattedCurrency({ price, currency })}`}
    </button>
  );
};
