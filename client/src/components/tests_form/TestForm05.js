import React from "react";

export const TestForm05 = ({ setCount, setStepTest, setAnswers, answers }) => {
  const nextStep = (res) => { 
    setStepTest(6);
    setAnswers([...answers,{name:"q5", value:res}]);
    setCount(7);}


  return (
    <>
      <h2>How stable is your income?</h2>
      {/* 1 respuesta */}
      <button className="btnTest" onClick={() => nextStep(1)}>
        <h3>I expect it to increase</h3>
      </button>
      <button className="btnTest" onClick={() => nextStep(2)}>
        <h3>Stable</h3>
      </button>
      <button className="btnTest" onClick={() => nextStep(3)}>
        <h3>Unstable</h3>
      </button>
      <button className="btnTest" onClick={() => nextStep(4)}>
        <h3>Highly unstable</h3>
      </button>
    </>
  );
};
