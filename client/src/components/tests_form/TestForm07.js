import React from "react";

export const TestForm07 = ({ setCount, setStepTest, setAnswers, answers }) => {
  const nextStep = (res) => { 
    setStepTest(8);
    setAnswers([...answers,{name:"q7", value:res}]);
    setCount(9);}


  return (
    <>
      <h2>What's your annual income?</h2>
      {/* 1 respuesta */}
      <button className="btnTest" onClick={() => nextStep(1)}>
        <h3>Less than €50.000</h3>
      </button>
      <button className="btnTest" onClick={() => nextStep(2)}>
        <h3>Between €50.000-€250.000</h3>
      </button>
      <button className="btnTest" onClick={() => nextStep(3)}>
        <h3>Between €250.000-€500.000</h3>
      </button>
      <button className="btnTest" onClick={() => nextStep(4)}>
        <h3>More than €500.000</h3>
      </button>
    </>
  );
};
