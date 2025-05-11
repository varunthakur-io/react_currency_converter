import { useState } from "react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-950">
      <div className="w-full max-w-sm p-5 bg-gray-900 rounded-xl shadow-lg border border-gray-800">
        <h1 className="text-lg font-semibold text-white text-center mb-4">
          Convert Currency
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <div className="mb-3">
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              onAmountChange={(amount) => setAmount(amount)}
              selectCurrency={from}
            />
          </div>
          <div className="flex justify-center mb-3">
            <button
              type="button"
              className="p-1.5 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition"
              onClick={swap}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {/* Left-pointing arrow (upper) */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 8H3m0 0l3-3m-3 3l3 3"
                />
                {/* Right-pointing arrow (lower) */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 16h12m0 0l-3-3m3 3l-3 3"
                />
              </svg>
            </button>
          </div>
          <div className="mb-4">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              amountDisable="true"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
