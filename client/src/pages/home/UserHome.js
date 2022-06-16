import { useNavigate } from "react-router-dom";

//SCSS
import "../scss/style.scss";
import "./scss/home.scss";

//COMPONENTS
import { Footer } from "../../components/Footer";

export const UserHome = ({ formCompleted }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="background">
        <h1>Access to high-yield investments</h1>
        <h3>Investing in Venture Capital funds</h3>
        <p>
          Do you want to be one of the first retail investors to invest in
          Venture Capital funds?
          <br />
          Take advantage from law's change to obtain the returns that until now
          only large investors have achieved.
        </p>

        {formCompleted < 2 && (
          <button
            onClick={
              formCompleted === 0
                ? () => navigate("/test")
                : () => navigate("/data")
            }
          >
            Complete your profile
          </button>
        )}

        {formCompleted === 2 && (
          <button onClick={() => navigate("/investmentOpportunities")}>
            Let´s start to invest
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
};
