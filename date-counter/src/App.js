import { useState } from "react";

export default function App() {
  return (
    <>
      <Counter />
    </>
  );
}

function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  let result = "";
  if (count >= 1) {
    result = `${count} days from today is ${date.toDateString()}`;
  } else if (count < 0) {
    result = `${-count} days ago it was ${date.toDateString()}`;
  } else {
    result = `Today is ${date.toDateString()}`;
  }

  //VERSION 1
  // return (
  //   <>
  //     {/* IMAJ VO PREDVID DEKA REACT TREBA DA GO MENADZIRA STATE-ot NA INPUT polinjata */}
  //     <div className="container">
  //       <button onClick={() => setStep((s) => s - 1)}>-</button>
  //       <p>Step: {step}</p>
  //       <button onClick={() => setStep((s) => s + 1)}>+</button>
  //     </div>
  //     <div className="container">
  //       <button onClick={() => setCount((c) => c - step)}>-</button>
  //       <p>Count: {count}</p>
  //       <button onClick={() => setCount((c) => c + step)}>+</button>
  //     </div>
  //     <span>{result}</span>
  //   </>
  // );

  //VERSION 2 - so slajder
  return (
    <>
      <div className="container">
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
        <p>{step}</p>
      </div>
      <div className="container">
        <button onClick={() => setCount((c) => c - step)}>-</button>
        <input
          type="text"
          onChange={(e) => setCount(Number(e.target.value))}
          value={count}
        />
        <button onClick={() => setCount((c) => c + step)}>+</button>
      </div>
      <span>{result}</span>
      {(count !== 0 || step !== 1) && (
        <button
          onClick={() => {
            setStep(1);
            setCount(0);
          }}
        >
          Reset
        </button>
      )}
    </>
  );
}
