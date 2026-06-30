import { useId } from "react";

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectedCurrency = "usd",
  amountDisabled = false,
  currencyDisabled = false,
  className = "",
}) {
  const amountInputId = useId();

  return (
    <div
      className={`rounded-3xl border border-slate-800/80 bg-slate-950/90 p-4 text-sm text-slate-100 shadow-sm ${className}`}
    >
      <div className="mb-4">
        <label
          htmlFor={amountInputId}
          className="block text-slate-400 mb-2 text-sm font-medium"
        >
          {label}
        </label>
        <input
          id={amountInputId}
          value={amount}
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          }
          className="w-full rounded-2xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 disabled:cursor-not-allowed disabled:bg-slate-900/70"
          type="number"
          placeholder="Amount"
          disabled={amountDisabled}
        />
      </div>
      <div>
        <p className="mb-2 text-slate-400 text-sm font-medium">Currency Type</p>
        <select
          className="w-full rounded-2xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 disabled:cursor-not-allowed disabled:bg-slate-900/70"
          value={selectedCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisabled}
        >
          {currencyOptions.length ? (
            currencyOptions.map((currency) => (
              <option key={currency} value={currency}>
                {currency.toUpperCase()}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No currencies available
            </option>
          )}
        </select>
      </div>
    </div>
  );
}

export default InputBox;
