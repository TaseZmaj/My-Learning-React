import { useState } from "react";

function SlowComponent() {
  // If this is too slow on your maching, reduce the `length`
  const words = Array.from({ length: 10000 }, () => "WORD");
  return (
    <ul>
      {words.map((word, i) => (
        <li key={i}>
          {i}: {word}
        </li>
      ))}
    </ul>
  );
}

function Counter({ children }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Slow counter?!?</h1>
      {/* Button click-ot e SPOR - bidejki sekoj pat koga ke 
      se azurira count se re-render-ira komponentot a vo komponentov
      go ima <SlowComponent/> koj generira mnogu golema niza*/}
      <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
      {children}
    </div>
  );
}

export default function Test() {
  // const [count, setCount] = useState(0);
  // return (
  //   <div>
  //     <h1>Slow counter?!?</h1>
  //     {/* Button click-ot e SPOR - bidejki sekoj pat koga ke
  //     se azurira count se re-render-ira komponentot a vo komponentov
  //     go ima <SlowComponent/> koj generira mnogu golema niza*/}
  //     <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
  //     <SlowComponent />
  //   </div>
  // );
  return (
    <div>
      <h1>Slow counter?!? </h1>
      <Counter>
        <SlowComponent />
      </Counter>
    </div>
  );
}
