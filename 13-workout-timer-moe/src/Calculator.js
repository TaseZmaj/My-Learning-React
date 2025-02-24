/* eslint-disable no-unused-vars */
import { memo, useEffect, useState } from "react";
import clickSound from "./ClickSound.m4a";

function Calculator({ workouts, allowSound }) {
  const [number, setNumber] = useState(workouts.at(0).numExercises);
  const [sets, setSets] = useState(3);
  const [speed, setSpeed] = useState(90);
  const [durationBreak, setDurationBreak] = useState(5);
  const [duration, setDuration] = useState(0);

  // const duration = (number * sets * speed) / 60 + (sets - 1) * durationBreak;
  const mins = Math.floor(duration);
  const seconds = (duration - mins) * 60;

  //BITNO: Imashe(sega vekje nema poso go popravi Jhonas us kucanje) cuden bug kaj
  //shto koa ke kliknes na sound toggle kopcheto vo gorniot
  //desen kjosh se resetira state-ot na timerot.  Ova se sluchuva bidejki allowSound se
  //menuva shto predizvikuva ovaa playSound() da e kreirana nanovo namesto da e zemena od
  //cache a koga taa e rekreirana - useEffect-ot dole se aktivira i se slucuva kalkulacijata
  //povtorno.
  // const playSound = useCallback(() => {
  //   if (!allowSound) return;
  //   const sound = new Audio(clickSound);
  //   sound.play();
  // }, [allowSound]);

  //sinhronizacija na duration state so site drugi states
  useEffect(() => {
    setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak);
    // playSound();
  }, [sets, speed, number, durationBreak]);
  //Ne e pozelno da se koristi useEffect za sinhroniziranje na state vo nekoj slucai
  //poradi faktot shto predizvikuva 2 re-renderi, ednas koga ke smenis nekoj od
  //number,sets,speed ili durationBreak i ushe ednas setDuration ke predizvika re-render
  //React ne moze da gi batch-ne ovie state updates vo 1 render ako iskucash vaka

  useEffect(() => {
    const playSound = () => {
      if (!allowSound) return;
      const sound = new Audio(clickSound);
      sound.play();
    };
    playSound();
  }, [duration, allowSound]);

  useEffect(() => {
    console.log(duration, sets); //ako vo dependency array se izostaveni
    //sets i duration, console.log() ke gi vrati starite values - stale values,
    //zatoa moras da gi definiras vo dependency array-ot
    document.title = `Your ${number}-exercise workout`;
  }, [number, duration, sets]);

  function handleInc() {
    setDuration((duration) => Math.floor(duration) + 1);
  }
  function handleDec() {
    setDuration((duration) => (duration > 1 ? Math.floor(duration) - 1 : 0));
  }

  return (
    <>
      <form>
        <div>
          <label>Type of workout</label>
          <select value={number} onChange={(e) => setNumber(+e.target.value)}>
            {workouts.map((workout) => (
              <option value={workout.numExercises} key={workout.name}>
                {workout.name} ({workout.numExercises} exercises)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>How many sets?</label>
          <input
            type="range"
            min="1"
            max="5"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
          <span>{sets}</span>
        </div>
        <div>
          <label>How fast are you?</label>
          <input
            type="range"
            min="30"
            max="180"
            step="30"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
          <span>{speed} sec/exercise</span>
        </div>
        <div>
          <label>Break length</label>
          <input
            type="range"
            min="1"
            max="10"
            value={durationBreak}
            onChange={(e) => setDurationBreak(e.target.value)}
          />
          <span>{durationBreak} minutes/break</span>
        </div>
      </form>
      <section>
        <button onClick={() => handleDec()}>–</button>
        <p>
          {mins < 10 && "0"}
          {mins}:{seconds < 10 && "0"}
          {seconds}
        </p>
        <button onClick={() => handleInc()}>+</button>
      </section>
    </>
  );
}
export default memo(Calculator);
