interface CmsDataProps {
  price: number;
  currency: string;
}

function formattedCurrency({ price, currency }: CmsDataProps) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currency,
  }).format(price / 100);
}

export function App({ price, currency }: CmsDataProps) {
  return <button>Pay {formattedCurrency({ price, currency })}</button>;
}
