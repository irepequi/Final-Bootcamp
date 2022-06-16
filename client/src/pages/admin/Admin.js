import React from "react";
import { Footer } from "../../components/Footer";

//SCSS
import "./scss/admin.scss";

export const Admin = () => {
  return (
    <div>
      <div className="backgroundAdmin">
        <h1>Profile manager</h1>
        <h3>Investing in Venture Capital funds</h3>
      </div>
      <Footer />
    </div>
  );
};
