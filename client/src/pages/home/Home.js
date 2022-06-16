import React from "react";

//SCSS
import "../scss/style.scss";
import "./scss/home.scss";

//COMPONENTS
import { Footer } from "../../components/Footer";

export const Home = () => {
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
      </div>
      <Footer />
    </div>
  );
};
