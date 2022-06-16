import React from "react";

export const TestForm06 = ({ setCount, setStepTest, setAnswers, answers }) => {
  const nextStep = (res) => { 
    setStepTest(7);
    setAnswers([...answers,{name:"q6", value:res}]);
    setCount(8);}


  return (
    <>
      <h2>What percentage of your income do you spend each month?</h2>
      {/* 1 respuesta */}
      <button className="btnTest" onClick={() => nextStep(1)}>
        <h3>Less than 25%</h3>
      </button>
      <button className="btnTest" onClick={() => nextStep(2)}>
        <h3>Between 25-50%</h3>
      </button>

      <button className="btnTest" onClick={() => nextStep(3)}>
        <h3>Between 50-75%</h3>
      </button>

      <button className="btnTest" onClick={() => nextStep(4)}>
        <h3>More than 75%</h3>
      </button>
    </>
  );
};
