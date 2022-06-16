import "./scss/lineaBolitas.scss";

export const LineaBolitasTest = ({ stepTest }) => {
  return (
    <>
      <div className="containerMap">
        <div className="progress">
          <div className="percent"></div>
        </div>

        <div className="steps">
          <div
            className={stepTest === 0 ? "selected" : "completed"}
            id="0"
          ></div>
          <div
            className={
              stepTest < 1 ? "step" : stepTest === 1 ? "selected" : "completed"
            }
            id="1"
          ></div>
          <div
            className={
              stepTest < 2 ? "step" : stepTest === 2 ? "selected" : "completed"
            }
            id="2"
          ></div>
          <div
            className={
              stepTest < 3 ? "step" : stepTest === 3 ? "selected" : "completed"
            }
            id="3"
          ></div>
          <div
            className={
              stepTest < 4 ? "step" : stepTest === 4 ? "selected" : "completed"
            }
            id="4"
          ></div>
          <div
            className={
              stepTest < 5 ? "step" : stepTest === 5 ? "selected" : "completed"
            }
            id="7"
          ></div>
          <div
            className={
              stepTest < 6 ? "step" : stepTest === 6 ? "selected" : "completed"
            }
            id="8"
          ></div>
          <div
            className={
              stepTest < 7 ? "step" : stepTest === 7 ? "selected" : "completed"
            }
            id="9"
          ></div>
          <div
            className={
              stepTest < 8 ? "step" : stepTest === 8 ? "selected" : "completed"
            }
            id="10"
          ></div>
          <div
            className={
              stepTest < 9 ? "step" : stepTest === 9 ? "selected" : "completed"
            }
            id="11"
          ></div>
          <div
            className={
              stepTest < 10
                ? "step"
                : stepTest === 10
                ? "selected"
                : "completed"
            }
            id="12"
          ></div>
        </div>
      </div>
      {/* <script src="./barra.js"></script> */}
    </>
  );
};
