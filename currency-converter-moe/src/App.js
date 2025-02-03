import { useState, useEffect } from "react";

//MOE RESHENIE
function App() {
  const [currencyAmount, setCurrencyAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [output, setOutput] = useState("OUTPUT");
  const [isLoading, setIsLoading] = useState(false); //ova e od kursot

  function handleCurrencyAmount(e) {
    setCurrencyAmount(Number(e.target.value));
  }
  function handleFromCurrency(e) {
    setFromCurrency(e.target.value);
  }
  function handleToCurrency(e) {
    setToCurrency(e.target.value);
  }

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCurrency() {
      try {
        setIsLoading(true);
        if (currencyAmount === 0 || fromCurrency === toCurrency) {
          setOutput("OUTPUT");
          return;
        }

        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${currencyAmount}&from=${fromCurrency}&to=${toCurrency}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error("Fetch is not ok!");
        }

        const data = await res.json();

        if (data.Response === "False") {
          throw new Error("Data response false!");
        }
        setOutput(Object.values(data.rates)[0]);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCurrency();
    return function () {
      controller.abort();
    };
  }, [currencyAmount, fromCurrency, toCurrency]);

  return (
    <div>
      <input
        value={currencyAmount}
        onChange={(e) => handleCurrencyAmount(e)}
        type="number"
        disabled={isLoading ? true : false}
      />
      <select value={fromCurrency} onChange={(e) => handleFromCurrency(e)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={toCurrency} onChange={(e) => handleToCurrency(e)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{output}</p>
    </div>
  );
}

export default App;
