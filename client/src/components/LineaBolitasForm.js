import "./scss/lineaBolitas.scss";

export const LineaBolitasForm = ({ stepForm }) => {
  return (
    <>
      <div className="containerMap">
        <div className="progress">
          <div className="percent"></div>
        </div>

        <div className="steps">
          <div
            className={stepForm === 0 ? "selected" : "completed"}
            id="0"
          ></div>
          <div
            className={
              stepForm < 1 ? "step" : stepForm === 1 ? "selected" : "completed"
            }
            id="1"
          ></div>
          <div
            className={
              stepForm < 2 ? "step" : stepForm === 2 ? "selected" : "completed"
            }
            id="2"
          ></div>
          <div
            className={
              stepForm < 3 ? "step" : stepForm === 3 ? "selected" : "completed"
            }
            id="3"
          ></div>
          <div
            className={
              stepForm < 4 ? "step" : stepForm === 4 ? "selected" : "completed"
            }
            id="4"
          ></div>
          <div
            className={
              stepForm < 5 ? "step" : stepForm === 5 ? "selected" : "completed"
            }
            id="5"
          ></div>
          <div
            className={
              stepForm < 6 ? "step" : stepForm === 6 ? "selected" : "completed"
            }
            id="6"
          ></div>
          <div
            className={
              stepForm < 7 ? "step" : stepForm === 7 ? "selected" : "completed"
            }
            id="7"
          ></div>
        </div>
      </div>
      <script src="./barra.js"></script>
    </>
  );
};
