import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  //Timer startuva na mount na komponentot, a mountot se slucuva
  //koga ke pocne kvizot - prvoto prashanje
  useEffect(() => {
    const interval = setInterval(() => {
      //bidejki dispatch-ov e vo setInterval, ke se odviva sekoja sekunda 1000ms
      dispatch({ type: "tick" });
    }, 1000);
    //MNOGU BITNO: ako nemash clean up funkcija, timerot ke prodolzi da runnuva
    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
