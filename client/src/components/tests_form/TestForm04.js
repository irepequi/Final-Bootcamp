import React from "react";

export const TestForm04 = ({ setCount, setStepTest, setAnswers, answers }) => {
  const nextStep = (res) => { 
    setStepTest(5);
    setAnswers([...answers,{name:"q4", value:res}]);
    setCount(6);}

  return (
    <>
      <h2>Your investment goal</h2>
      {/* 1 respuesta */}
      <button className="btnTest" onClick={() => nextStep(1)}>
        <h3>Saving</h3>
      </button>
      <button className="btnTest" onClick={() => nextStep(2)}>
        <h3>Retirement</h3>
      </button>
      <button className="btnTest" onClick={() => nextStep(3)}>
        <h3>Regular income</h3>
      </button>
      <button className="btnTest" onClick={() => nextStep(4)}>
        <h3>Pay for children's education</h3>
      </button>
      <button className="btnTest" onClick={() => nextStep(5)}>
        <h3>Other</h3>
      </button>
    </>
  );
};
