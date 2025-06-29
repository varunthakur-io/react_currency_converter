import { useState } from "react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  // State for user input amount
  const [amount, setAmount] = useState(0);

  // State for source currency code
  const [from, setFrom] = useState("usd");

  // State for target currency code
  const [to, setTo] = useState("inr");

  // State for converted amount
  const [convertedAmount, setConvertedAmount] = useState(0);

  // Fetch currency rates for the selected source currency
  const currencyInfo = useCurrencyInfo(from);

  // Generate currency options for dropdowns
  const options = Object.keys(currencyInfo).length
    ? Object.keys(currencyInfo)
    : ["usd", "inr"];

  // Swap source and target currencies and their amounts
  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  // Perform currency conversion and update convertedAmount
  const convert = () => {
    if (amount >= 0 && currencyInfo?.[to]) {
      setConvertedAmount((amount * currencyInfo[to]).toFixed(2));
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-gray-900 to-gray-950">
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-800 relative">
        {/* Currency Converter Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          {/* Input for source currency and amount */}
          <div className="mb-6">
            <InputBox
              label="From"
              amount={amount}
              onAmountChange={setAmount}
              onCurrencyChange={setFrom}
              currencyOptions={options}
              selectCurrency={from}
              amountDisabe={false}
              currencyDisable={false}
            />
          </div>
          {/* Button to swap currencies */}
          <div className="flex justify-center mb-6">
            <button
              type="button"
              className="p-3 bg-gradient-to-tr from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:scale-110 transition-transform border-4 border-gray-900"
              onClick={swap}
              aria-label="Swap currencies"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 8H3m0 0l3-3m-3 3l3 3"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 16h12m0 0l-3-3m3 3l-3 3"
                />
              </svg>
            </button>
          </div>
          {/* Input for target currency and converted amount */}
          <div className="mb-8">
            <InputBox
              label="To"
              amount={convertedAmount}
              onAmountChange={() => {}}
              onCurrencyChange={setTo}
              currencyOptions={options}
              selectCurrency={to}
              amountDisabe={true}
              currencyDisable={false}
            />
          </div>
          {/* Submit button to trigger conversion */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-tr from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition font-semibold text-lg shadow-lg tracking-wide"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
        {/* Footer */}
        <div className="mt-8 text-center text-gray-400 text-xs">
          Powered by{" "}
          <span className="font-semibold text-blue-400">Your Currency API</span>
        </div>
      </div>
    </div>
  );
}

export default App;
