function FinishSreen({ points, maxPossiblePoints, highscore, dispatch }) {
  const percentage = (points / maxPossiblePoints) * 100;

  return (
    <>
      <div>
        <p className="result">
          You scored <strong>{points}</strong> out of {maxPossiblePoints}
          &nbsp; ({Math.ceil(percentage)}%)
        </p>
      </div>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishSreen;
