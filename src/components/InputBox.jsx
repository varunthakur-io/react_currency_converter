/* eslint-disable react/prop-types */
import React, { useId } from "react";

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "usd",
  amountDisabe = false,
  currencyDisable = false,
  className = "",
}) {
  const amountInputId = useId();
  return (
    <div
      className={`flex flex-col gap-1 p-3 bg-gray-900 rounded-lg border border-gray-700 ${className}`}
    >
      <label
        htmlFor={amountInputId}
        className="text-gray-400 text-xs font-semibold uppercase tracking-wide"
      >
        {label}
      </label>
      <div className="flex gap-3">
        <input
          id={amountInputId}
          className="w-2/3 p-1 bg-gray-800 text-white border border-gray-700 rounded-md focus:border-blue-500 outline-none disabled:opacity-50"
          type="number"
          placeholder="0"
          disabled={amountDisabe}
          value={amount}
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          }
        />
        <select
          className="w-1/3 p-1 pl-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:border-blue-500 outline-none disabled:opacity-50"
          value={selectCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisable}
        >
          {currencyOptions.map((currency) => (
            <option
              key={currency}
              value={currency}
              className="bg-gray-800 text-white"
            >
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;
