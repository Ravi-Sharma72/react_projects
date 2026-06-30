import { useState, useEffect } from "react";

const useCurrencyInfo = (currency) => {
  const [currencyData, setCurrencyData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrencyData = async () => {
      setLoading(true);
      setError(null);

      try {
        let url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`;
        let response = await fetch(url);

        if (!response.ok) {
          // fallback to a working endpoint if the jsDelivr URL fails
          url = `https://api.exchangerate.host/latest?base=${currency}`;
          response = await fetch(url);
        }

        if (!response.ok) {
          throw new Error("Failed to fetch currency data");
        }

        const data = await response.json();
        const rates = data?.rates ? data.rates : data?.[currency] || {};
        if (!rates || Object.keys(rates).length === 0) {
          throw new Error("Unexpected API response");
        }

        const normalizedRates = Object.fromEntries(
          Object.entries(rates).map(([currencyCode, rate]) => [
            currencyCode.toLowerCase(),
            rate,
          ]),
        );

        setCurrencyData(normalizedRates);
      } catch (err) {
        setError(err.message || "Failed to fetch currency data");
        setCurrencyData({});
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencyData();
  }, [currency]);

  return { currencyData, loading, error };
};

export default useCurrencyInfo;
