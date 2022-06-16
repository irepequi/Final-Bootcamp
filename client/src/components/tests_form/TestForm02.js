import React from "react";

export const TestForm02 = ({ setCount, setStepTest, setAnswers, answers }) => {

  const nextStep = (res) => { 
    setStepTest(3);
    setAnswers([...answers,{name:"q2", value:res}]);
    setCount(4);}

  return (
    <>
      <h2>What is your previous experience with investing?</h2>
      {/* 1 respuesta */}
      <button className="btnTest" onClick={() => nextStep(1)}>
        <h3>Low</h3>
        <p>I’ve never invested before</p>
      </button>

      <button className="btnTest" onClick={() => nextStep(2)}>
        <h3>Mixed</h3>
        <p>I’ve had investments but never followed the markets</p>
      </button>

      <button className="btnTest" onClick={() => nextStep(3)}>
        <h3>High</h3>
        <p>I’ve had investments and understand the market</p>
      </button>

      <button className="btnTest" onClick={() => nextStep(4)}>
        <h3>Expert</h3>
        <p>I’m a professional investor</p>
      </button>
    </>
  );
};
