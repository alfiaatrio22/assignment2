import React, { useEffect, useState } from "react";

const CurrencyTable = () => {
  const [rates, setRates] = useState([]);
  const apiKey = "b37f8777c729430c8ed4c99ab0c57716";

  const weBuy = (rate) => (rate * 1.05).toFixed(4);
  const weSell = (rate) => (rate * 0.95).toFixed(4);
  const exchangeRate = (rate) => rate.toFixed(4);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(
          `https://api.currencyfreaks.com/latest?apikey=${apiKey}`
        );
        const data = await response.json();
        const currencies = ["CAD", "EUR", "IDR", "JPY", "CHF", "GBP"];
        const ratesData = currencies.map((currency) => {
          const rate = parseFloat(data.rates[currency]);
          return {
            currency,
            weBuy: weBuy(rate),
            exchangeRate: exchangeRate(rate),
            weSell: weSell(rate),
          };
        });
        setRates(ratesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRates();
  }, [apiKey]);

  return (
    <div
      style={{
        backgroundColor: "orange",
        color: "white",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <table
        style={{ margin: "0 auto", borderCollapse: "collapse", width: "60%" }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid white", padding: "8px" }}>
              Currency
            </th>
            <th style={{ border: "1px solid white", padding: "8px" }}>
              We Buy
            </th>
            <th style={{ border: "1px solid white", padding: "8px" }}>
              Exchange Rate
            </th>
            <th style={{ border: "1px solid white", padding: "8px" }}>
              We Sell
            </th>
          </tr>
        </thead>
        <tbody>
          {rates.map((rate, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid white", padding: "8px" }}>
                {rate.currency}
              </td>
              <td style={{ border: "1px solid white", padding: "8px" }}>
                {rate.weBuy}
              </td>
              <td style={{ border: "1px solid white", padding: "8px" }}>
                {rate.exchangeRate}
              </td>
              <td style={{ border: "1px solid white", padding: "8px" }}>
                {rate.weSell}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Rates are based on 1 USD</p>
      <p>
        This application uses API from{" "}
        <a href="https://currencyfreaks.com" style={{ color: "white" }}>
          https://currencyfreaks.com
        </a>
      </p>
    </div>
  );
};

export default CurrencyTable;
