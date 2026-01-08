interface CmsDataProps {
  price: number;
  currency: string;
}

export function App({ price, currency }: CmsDataProps) {
  function formattedCurrency({ price, currency }: CmsDataProps) {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: currency,
    }).format(price / 100);
  }

  return <button>Pay {formattedCurrency({ price, currency })}</button>;
}
