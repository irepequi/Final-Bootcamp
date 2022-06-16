import React from "react";

export const TestForm08 = ({ setCount, setStepTest, setAnswers, answers }) => {
  const nextStep = (res) => { 
    setStepTest(9);
    setAnswers([...answers,{name:"q8", value:res}]);
    setCount(10);}


  return (
    <>
      <h2>What's the total value of your assets?</h2>
      {/* 1 respuesta */}
      <button className="btnTest" onClick={() => nextStep(1)}>
        <h3>Less than €100.000</h3>
      </button>
      <button className="btnTest" onClick={() => nextStep(2)}>
        <h3>Less than €100.000</h3>
      </button>
      <button className="btnTest" onClick={() => nextStep(3)}>
        <h3>Between €500.000-€1 million</h3>
      </button>
      <button className="btnTest" onClick={() => nextStep(4)}>
        <h3>More than €1 million</h3>
      </button>
    </>
  );
};
