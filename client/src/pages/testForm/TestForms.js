import React from "react";
import { useState } from "react";

//COMPONENTS
import { TestFormVideo } from "../../components/tests_form/TestFormVideo";
import { TestForm01 } from "../../components/tests_form/TestForm01";
import { TestForm02 } from "../../components/tests_form/TestForm02";
import { TestForm03 } from "../../components/tests_form/TestForm03";
import { TestForm04 } from "../../components/tests_form/TestForm04";
import { TestForm05 } from "../../components/tests_form/TestForm05";
import { TestForm06 } from "../../components/tests_form/TestForm06";
import { TestForm07 } from "../../components/tests_form/TestForm07";
import { TestForm08 } from "../../components/tests_form/TestForm08";
import { TestForm09_input } from "../../components/tests_form/TestForm09_input";
import { TestForm10 } from "../../components/tests_form/TestForm10";
import { TestForm_Confirm_risk } from "../../components/tests_form/TestForm_Confirm_risk";
import { TestForm_Congratulations } from "../../components/tests_form/TestForm_Congratulations";
import { TestForm_issue_final } from "../../components/tests_form/TestForm_issue_final";
import { LineaBolitasTest } from "../../components/LineaBolitasTest";

//SCSS
import "../../components/scss/test.scss";

export const TestForms = ({ setFormCompleted }) => {
  const [count, setCount] = useState(1);
  const [stepTest, setStepTest] = useState(0);
  const [countTest, setCountTest] = useState(0);
  const [answers, setAnswers] = useState([]);

  return (
    <>
      <div className="containerWithoutLogo">
        <div className="containerWhiteForm">
          <div className="header">
            <h2 className="title">Investor profile</h2>

            {/* linea tiempo bolitas */}
            <LineaBolitasTest
              stepTest={stepTest}
              answers={answers}
              setAnswers={setAnswers}
            />
          </div>

          {count === 1 && (
            <TestFormVideo
              setCount={setCount}
              setStepTest={setStepTest}
              stepTest={stepTest}
              answers={answers}
              setAnswers={setAnswers}
            />
          )}

          {count === 2 && (
            <TestForm01
              setCount={setCount}
              setStepTest={setStepTest}
              stepTest={stepTest}
              answers={answers}
              setAnswers={setAnswers}
            />
          )}
          {count === 3 && (
            <TestForm02
              setCount={setCount}
              setStepTest={setStepTest}
              stepTest={stepTest}
              answers={answers}
              setAnswers={setAnswers}
            />
          )}
          {count === 4 && (
            <TestForm03
              setCount={setCount}
              setStepTest={setStepTest}
              stepTest={stepTest}
              answers={answers}
              setAnswers={setAnswers}
            />
          )}
          {count === 5 && (
            <TestForm04
              setCount={setCount}
              setStepTest={setStepTest}
              stepTest={stepTest}
              answers={answers}
              setAnswers={setAnswers}
            />
          )}
          {count === 6 && (
            <TestForm05
              setCount={setCount}
              setStepTest={setStepTest}
              stepTest={stepTest}
              answers={answers}
              setAnswers={setAnswers}
            />
          )}
          {count === 7 && (
            <TestForm06
              setCount={setCount}
              setStepTest={setStepTest}
              stepTest={stepTest}
              answers={answers}
              setAnswers={setAnswers}
            />
          )}
          {count === 8 && (
            <TestForm07
              setCount={setCount}
              setStepTest={setStepTest}
              stepTest={stepTest}
              answers={answers}
              setAnswers={setAnswers}
            />
          )}
          {count === 9 && (
            <TestForm08
              setCount={setCount}
              setStepTest={setStepTest}
              stepTest={stepTest}
              answers={answers}
              setAnswers={setAnswers}
            />
          )}

          {count === 10 && (
            <TestForm09_input
              setCount={setCount}
              setStepTest={setStepTest}
              stepTest={stepTest}
              answers={answers}
              setAnswers={setAnswers}
            />
          )}
          {count === 11 && (
            <TestForm10
              setCount={setCount}
              setStepTest={setStepTest}
              stepTest={stepTest}
              answers={answers}
              setAnswers={setAnswers}
            />
          )}
          {count === 12 && (
            <TestForm_Confirm_risk setCount={setCount} answers={answers} />
          )}
          {count === 13 && (
            <TestForm_Congratulations
              setCount={setCount}
              setFormCompleted={setFormCompleted}
            />
          )}
          {count === 14 && <TestForm_issue_final setCount={setCount} />}
        </div>
      </div>
    </>
  );
};
