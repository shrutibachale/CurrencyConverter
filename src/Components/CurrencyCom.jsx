import { faRightLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { CurrencySelected } from './CurrencySelected'


export const CurrencyCom = () => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [amount, setAmount] = useState(100);
  const [result, setResult] = useState("");

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const API_KEY = process.env.REACT_APP_API_KEY;

  const getExchangeRate = async () => {
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`;

    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const rate = (data.conversion_rate * amount).toFixed(2);
      setResult(`${amount} ${fromCurrency} = ${rate} ${toCurrency}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    getExchangeRate();
  };

  return (
    <>
      <h1 className="text-center text-3xl md:text-4xl font-bold pt-6 text-white">
        Currency Converter
      </h1>

      <form
        onSubmit={handleFormSubmit}
        className="max-w-lg w-full mx-auto bg-gray-800 mt-10 p-6 rounded-xl"
      >
        {/* Amount */}
        <div className="mb-6">
          <label className="block text-white mb-2">Enter Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full h-12 rounded-lg px-4 font-medium"
          />
        </div>

        {/* Currency Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <label className="text-white">From</label>
            <CurrencySelected
              selectedCurrency={fromCurrency}
              handleCurrency={(e) => setFromCurrency(e.target.value)}
            />
          </div>

          <FontAwesomeIcon
            onClick={handleSwapCurrencies}
            icon={faRightLeft}
            className="text-2xl text-white mt-4 md:mt-7 cursor-pointer hover:text-gray-400"
          />

          <div>
            <label className="text-white">To</label>
            <CurrencySelected
              selectedCurrency={toCurrency}
              handleCurrency={(e) => setToCurrency(e.target.value)}
            />
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full h-12 bg-blue-600 mt-6 rounded-lg text-white hover:bg-blue-700"
        >
          Get Exchange Rate
        </button>

        {/* Result */}
        {result && (
          <p className="mt-4 bg-blue-300 text-slate-900 font-medium text-center py-3 rounded-lg">
            {result}
          </p>
        )}
      </form>
    </>
  );
};
