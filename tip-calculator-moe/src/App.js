//KOMENTIRANITE RABOTI SE MOJ KOD SHTO GO NAPISHAV PRED
//DA GO IZLEDAM TUTORIJALOT

import { useState } from "react";

function App() {
  const [billCost, setBillCost] = useState(0);
  const [ownTip, setOwnTip] = useState(0);
  const [friendTip, setFriendTip] = useState(0);

  function handleBillChange(event) {
    setBillCost(Number(event.target.value));
  }

  function handleReset() {
    setBillCost(0);
    setOwnTip(0);
    setFriendTip(0);
  }

  return (
    <>
      <BillInput handleBillChange={handleBillChange} billCost={billCost} />
      <SelectPercentage
        // type="own"
        percentage={ownTip}
        setPercentage={setOwnTip}
      >
        How did you like the service?
      </SelectPercentage>
      <SelectPercentage
        // type="friend"
        percentage={friendTip}
        setPercentage={setFriendTip}
      >
        How did your friend like the service?
      </SelectPercentage>
      {billCost > 0 && (
        <>
          <Output ownTip={ownTip} friendTip={friendTip} billCost={billCost} />
          <Reset
            // setBillCost={setBillCost}
            // setOwnTip={setOwnTip}
            // setFriendTip={setFriendTip}
            handleReset={handleReset}
          />
        </>
      )}
    </>
  );
}

function Output({ ownTip, friendTip, billCost }) {
  const avgTip = ((ownTip / 100) * billCost + (friendTip / 100) * billCost) / 2;
  // const fullBill = avgTip + billCost;

  return (
    <h2>
      You pay ${avgTip + billCost} (${billCost} + ${avgTip}tip)
    </h2>
  );
}

function BillInput({ billCost, handleBillChange }) {
  return (
    <div className="main">
      <label>How much was the bill?</label>
      <input
        type="text"
        value={billCost}
        onChange={(e) => handleBillChange(e)}
      />
    </div>
  );
}

function SelectPercentage({ percentage, setPercentage, children }) {
  // function handleTipChange(event) {
  //   if (type === "friend") setFriendTip(Number(event.target.value));
  //   else setOwnTip(Number(event.target.value));
  // }

  return (
    <div className="main">
      <label>{children}</label>
      <select
        // value={type === "own" ? ownTip : friendTip} vaka pocnav da go praam
        onChange={(e) => setPercentage(Number(e.target.value))}
        value={percentage}
      >
        <option value={0}>Dissatisfied (0%)</option>
        <option value={5}>It was okay (5%)</option>
        <option value={10}>It was good (10%)</option>
        <option value={20}>Absolutley amazing! (20%)</option>
      </select>
    </div>
  );
}

function Reset({ handleReset }) {
  return <button onClick={() => handleReset()}>Reset</button>;
}

export default App;
