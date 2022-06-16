import React from "react";
import { useNavigate } from "react-router-dom";

export const TestForm_Congratulations = ({ setFormCompleted }) => {
  const navigate = useNavigate();
  return (
    <>
      <h2>Congratulations, you completed the investor profile successfully.</h2>
      <p>
        You're nearly ready to invest in our fund. You just need to confirm your
        identity and you're good to go.
      </p>
      <br />

      <button
        onClick={() => {
          navigate("/home");
          setFormCompleted(1);
        }}
      >
        Go on
      </button>
    </>
  );
};
