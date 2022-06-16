import React, { useState } from "react";
export const TestForm01 = ({ answers,setAnswers,setCount, setStepTest }) => {
  


  const nextStep = (res) => { 
    setStepTest(2);
    setAnswers([...answers,{name:"q1", value:res}]);
    setCount(3);}



  return (
    <>
      <h2>What kind of investor are you?</h2>
      {/* c/u es una respuesta */}



      <button className="btnTest" onClick={() =>nextStep(1)}>
        <h3>Conservative</h3>
        <p>I take minimal risk</p>
      </button>

      <button className="btnTest" onClick={() =>nextStep(2)}>
        <h3>Mixed</h3>
        <p>I take some risk to increase potential reward</p>
      </button>

      <button className="btnTest" onClick={() =>nextStep(3)}>
        <h3>Aggressive</h3>
        <p>I take big risks in the hope of big rewards</p>
      </button>
    </>
  );
};
