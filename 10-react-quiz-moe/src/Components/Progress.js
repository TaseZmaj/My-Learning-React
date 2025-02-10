function Progress({ index, numQuestions, points, maxPossiblePoints, answer }) {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        //ako postoi answer togas i+1 neka e progressbarot, inaku i
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Question &nbsp;
        <strong>
          {index + 1}/{numQuestions}
        </strong>
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
