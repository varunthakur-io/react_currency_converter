import { useId } from "react";

/**
 * InputBox component for entering an amount and selecting a currency.
 *
 * Props:
 * - label: Label for the input field.
 * - amount: Current value of the amount input.
 * - onAmountChange: Callback when the amount changes.
 * - onCurrencyChange: Callback when the currency selection changes.
 * - currencyOptions: Array of available currency codes.
 * - selectCurrency: Currently selected currency code.
 * - amountDisabe: If true, disables the amount input.
 * - currencyDisable: If true, disables the currency select.
 * - className: Additional CSS classes for the container.
 */
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
  // Generate a unique ID for the amount input for accessibility
  const amountInputId = useId();

  // Styles for the component elements
  const inputBoxStyles =
    "relative bg-gray/20 backdrop-blur-md border border-blue-400/40 rounded-2xl px-5 py-4 shadow-xl flex flex-col gap-1 transition focus-within:ring-2 focus-within:ring-purple-400";
  const inputStyles =
    "bg-transparent outline-none text-white placeholder:text-gray-300 w-full text-lg font-semibold";
  const labelStyles =
    "block text-sm font-bold text-blue-200 mb-2 tracking-wide";
  const selectStyles =
    "bg-white/10 text-white border-none rounded-lg px-3 py-2 ml-3 focus:ring-2 focus:ring-blue-400 transition";

  return (
    <div className={`${inputBoxStyles} ${className}`}>
      {/* Label for the amount input */}
      <label htmlFor={amountInputId} className={labelStyles}>
        {label}
      </label>
      <div className="flex gap-3">
        {/* Amount input field */}
        <input
          id={amountInputId}
          className={inputStyles}
          type="number"
          placeholder="0"
          disabled={amountDisabe}
          value={amount}
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          }
        />
        {/* Currency selection dropdown */}
        <select
          className={selectStyles}
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
