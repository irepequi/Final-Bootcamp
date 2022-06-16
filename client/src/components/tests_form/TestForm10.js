import React from "react";

export const TestForm10 = ({ setCount, setStepTest, setAnswers, answers }) => {
  const nextStep = (res) => { 
    setStepTest(11);
    setAnswers([...answers,{name:"q10", value:res}]);
    setCount(12);}
  

  return (
    <>
      <h2>How much of your total assets does this represent?</h2>
      {/* 1 respuesta */}
      <button className="btnTest" onClick={() => nextStep(1)}>
        <h3>More than 50%</h3>
      </button>
      <button className="btnTest" onClick={() => nextStep(2)}>
        <h3>Between 10-50%</h3>
      </button>
      <button className="btnTest" onClick={() => nextStep(3)}>
        <h3>Less than 10%</h3>
      </button>
    </>
  );
};
