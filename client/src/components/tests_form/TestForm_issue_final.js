import React from "react";
import { useNavigate } from "react-router-dom";

export const TestForm_issue_final = ({ setFormCompleted }) => {
  const navigate = useNavigate();

  return (
    <>
      <h2>
        Unfortunately one or more of your answers indicates you are not eligible
        for this investment.
      </h2>
      <p>Your investment cannot exceed 10% of your total assets.</p>
      <p>
        If there was a mistake in your answers, please contact us for more
        information.
      </p>
      <br />

      <button
        onClick={() => {
          navigate("/home");
          setFormCompleted(3);
        }}
      >
        Contact Invertor
      </button>
    </>
  );
};
