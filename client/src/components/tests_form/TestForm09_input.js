import React, { useState } from "react";

export const TestForm09_input = ({ setCount, setStepTest, setAnswers, answers }) => {

   const [money, setMoney] = useState({money:"",});
   const [message, setMessage] = useState();

  const nextStep = (res) => { 
    if (money.money === ""){
        setMessage("There are some empty fields");
      } else{
    setStepTest(10);
    setAnswers([...answers,{name:"q9_invest_money", value:res}]);
    setCount(11);}
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMoney({ ...money, [name]: value });
  };
  

  return (
    <>
      <div className="form_group field">
        <input
          className="form_field"
          type="text"
          placeholder="How much do you want to invest?"
          autoComplete="off"
          id="money"
          name = "money"
          onChange={handleChange}
          required
        />
        <label className="form_label" htmlFor="money">
          How much do you want to invest? <span className="required">*</span>
        </label>
      </div>
        {/* MENSAJE DE ERROR  */}
        <p className="required">{message}</p>

      <button onClick={() => nextStep(money.money)}>Next step</button>
    </>
  );
};
