import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModalInvest } from "./ModalInvest";

//SCSS
import "./scss/investment.scss";

export const Investment = ({ formCompleted, filtro }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  return (
    <div className="containerWhiteInvestment">
      <img src="/images/investment-default/backgroundInvestment.jpg"
        alt="Background Investment" />

      <div className="investment">
        <div>
          <h4>Company: {filtro.company}</h4>
          <h5>Sector: {filtro.sector_name}</h5>
        </div>

        <div>
          <p>Geographics focus: {filtro.geographics_focus}</p>
          <p>Style: {filtro.style}</p>
        </div>

        <div className="botones">
          <button
            disabled={formCompleted === 2 ? false : true}
            onClick={handleShow}
          >
            Invest
          </button>

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
        </div>

        <ModalInvest
          show={show}
          setShow={setShow}
          investment_id={filtro.investment_fund_id}
        />
      </div>
    </div>
  );
};
