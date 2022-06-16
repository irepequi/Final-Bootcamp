import React from "react";

export const TestForm03 = ({ setCount, setStepTest, setAnswers, answers }) => {

  const nextStep = (res) => { 
    setStepTest(4);
    setAnswers([...answers,{name:"q3", value:res}]);
    setCount(5);}

  return (
    <>
      <h2>Your investment timeline</h2>
      {/* 1 respuesta */}
      <button className="btnTest" onClick={() => nextStep(1)}>
        <h3>Short term</h3>
        <p>I’ll need the money in less than two years</p>
      </button>

      <button className="btnTest" onClick={() => nextStep(2)}>
        <h3>Medium term</h3>
        <p>I’ll need the money in 2-5 years</p>
      </button>

      <button className="btnTest" onClick={() => nextStep(3)}>
        <h3>Medium term</h3>
        <p>I’ll need the money in 2-5 years</p>
      </button>

      <button className="btnTest" onClick={() => nextStep(4)}>
        <h3>Long term</h3>
        <p>I don’t need the money for at least 5 years</p>
      </button>
    </>
  );
};
