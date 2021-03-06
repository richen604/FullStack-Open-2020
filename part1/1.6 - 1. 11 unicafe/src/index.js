import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Statistic = (props) => (
  <table>
    <tbody>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </tbody>
  </table>
);

const Statistics = ({ good, neutral, bad, total, average, percentage }) => {
  if (!total) {
    return <Statistic text="No feedback given" />;
  }
  return (
    <>
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="total" value={total} />
      <Statistic text="average" value={average} />
      <Statistic text="percentage" value={percentage}>
        %
      </Statistic>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const handleGood = () => {
    const newValue = good + 1;
    setGood(newValue);
    setTotal(total + 1);
    handleAverage();
    handlePercentage();
  };

  const handleNeutral = () => {
    const newValue = neutral + 1;
    setNeutral(newValue);
    setTotal(total + 1);
    handlePercentage();
  };

  const handleBad = () => {
    const newValue = bad + 1;
    setBad(newValue);
    setTotal(total + 1);
    handleAverage();
    handlePercentage();
  };

  const handleAverage = () => {
    //BUG clicking good and then bad leads to a positive average
    const difference = good - bad;
    setAverage(difference / 2);
  };

  const handlePercentage = () => {
    //BUG returns NaN on some results, converting for a string for showcasing
    let newPercentage = (good / total) * 100;
    if (isNaN(newPercentage)) newPercentage = "NaN";
    setPercentage(newPercentage);
  };

  return (
    <>
      <h2>give feedback</h2>
      <div>
        <Button handleClick={handleGood} text="good" />
        <Button handleClick={handleNeutral} text="neutral" />
        <Button handleClick={handleBad} text="bad" />
      </div>
      <h2>statistics</h2>
      <Statistics {...{ good, neutral, bad, total, average, percentage }} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
