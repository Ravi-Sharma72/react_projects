import { useState } from "react";
import "./App.css";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const { currencyData, loading, error } = useCurrencyInfo(from);

  const defaultOptions = ["usd", "inr", "eur", "gbp", "jpy", "aud", "cad"];
  const options = Object.keys(currencyData).length
    ? Object.keys(currencyData)
    : defaultOptions;
  const exchangeRate = currencyData?.[to] ?? null;

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    if (!exchangeRate) return;
    setConvertedAmount(amount * exchangeRate);
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100"
      style={{
        backgroundImage:
          "radial-gradient(circle at top left, rgba(56, 189, 248, 0.24), transparent 28%), radial-gradient(circle at bottom right, rgba(16, 185, 129, 0.18), transparent 30%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at top, rgba(56,189,248,0.16), transparent 30%), radial-gradient(circle at bottom, rgba(16,185,129,0.14), transparent 28%)",
        }}
      />
      <main className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-4 py-10">
        <section className="w-full rounded-4xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-sky-300/80">
                Global Currency Converter
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Convert currencies instantly
              </h1>
              <p className="mt-4 max-w-2xl text-slate-300 sm:text-base">
                Use live exchange rates to convert between currencies. Choose
                your currency pair and press convert for a quick result.
              </p>
            </div>
            <div className="rounded-3xl bg-slate-950/90 px-5 py-4 text-center ring-1 ring-white/10 shadow-xl shadow-slate-950/25">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                Current pair
              </p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {from.toUpperCase()} → {to.toUpperCase()}
              </p>
              <p className="mt-1 text-slate-400">
                Rate: {exchangeRate ? exchangeRate.toFixed(4) : "N/A"}
              </p>
            </div>
          </div>

          <div className="rounded-4xl border border-slate-800 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                convert();
              }}
              className="space-y-5"
            >
              {loading && (
                <div className="rounded-3xl border border-slate-800 bg-slate-900/95 p-4 text-center text-slate-300">
                  Fetching latest exchange rates...
                </div>
              )}
              {error && (
                <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-4 text-center text-red-200">
                  {error}
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <InputBox
                  label="From"
                  amount={amount}
                  onAmountChange={setAmount}
                  selectedCurrency={from}
                  onCurrencyChange={setFrom}
                  currencyOptions={options}
                />
                <InputBox
                  label="To"
                  amount={convertedAmount}
                  onAmountChange={setConvertedAmount}
                  selectedCurrency={to}
                  onCurrencyChange={setTo}
                  currencyOptions={options}
                  amountDisabled
                />
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={swap}
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/90 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
                >
                  Swap currencies
                </button>
                <button
                  type="submit"
                  disabled={loading || !exchangeRate}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-slate-600 sm:w-auto"
                >
                  {loading
                    ? "Loading rates..."
                    : `Convert ${from.toUpperCase()} → ${to.toUpperCase()}`}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
