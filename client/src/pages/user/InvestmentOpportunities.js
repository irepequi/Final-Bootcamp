import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Buscador } from "../../components/Buscador";

//COMPONENTS

import { Investment } from "../../components/Investment";

//SCSS
import "../../components/scss/investment.scss";

export const InvestmentOpportunities = ({ formCompleted }) => {
  const navigate = useNavigate();
  const [allInvestments, setAllInvestments] = useState([]);
  const [filter, setFilter] = useState();
  const [width, setWidth] = useState(window.innerWidth);
  const [breadcrumbs, setBreadcrumbs] = useState(
    <div className="breadcrumbs">
      <ul className="steps">
        <li className="completedBreadcrumb">Account creation</li>
        <li
          className={
            formCompleted < 0
              ? "step"
              : formCompleted === 0
              ? "selectedBreadcrumb"
              : "completedBreadcrumb"
          }
        >
          Investor profile
        </li>
        <li
          className={
            formCompleted < 1
              ? "step"
              : formCompleted === 1
              ? "selectedBreadcrumb"
              : "completedBreadcrumb"
          }
        >
          Confirm identity
        </li>
      </ul>
    </div>
  );

  const cambiarBreadcrumbs = () => {
    setBreadcrumbs(
      
    );
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/users/getAllInvestmentsEnable")
      .then((res) => {
        setAllInvestments(res.data);
        setFilter(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // useEffect(() => {
  //   window.addEventListener("resize", cambiarBreadcrumbs);

  //   return () => {
  //     window.removeEventListener("resize", cambiarBreadcrumbs);
  //   };
  // }, []);

  return (
    <>
     
        {formCompleted === 0 || formCompleted === 1 ? (
          <div className="containerWhite">
            <p>
              In order to use Invertor, you need to complete your registration
            </p>

            {/* BREADCRUMBS */}
            <div className="table-responsive">
            <div className="breadcrumbs">
        <ul className="steps">
          <li className="completedBreadcrumb">
            Account creation
          </li>
          <li
            className={
              formCompleted < 0
                ? "step"
                : formCompleted === 0
                ? "selectedBreadcrumb"
                : "completedBreadcrumb"
            }
          >
            Investor profile
          </li>
          <li
            className={
              formCompleted < 1
                ? "step"
                : formCompleted === 1
                ? "selectedBreadcrumb"
                : "completedBreadcrumb"
            }
          >
            Confirm identity
          </li>
        </ul>
      </div>
      </div>

            <button
              onClick={
                formCompleted === 0
                  ? () => navigate("/test")
                  : () => navigate("/data")
              }
            >
              Complete your profile
            </button>
          </div>
        ) : (
          formCompleted === 3 && (
            <div className="containerWhite">
              <h2>
                Unfortunately one or more of your answers indicates you are not
                eligible for this investment.
              </h2>
              <p>Your investment cannot exceed 10% of your total assets.</p>
              <p>
                If there was a mistake in your answers, please contact us for
                more information.
              </p>
            </div>
          )
        )}
        
          <div className="body">
        <h2>ALl Investments opportunities</h2>

        <Buscador setAllInvestments={setAllInvestments}  allInvestments={allInvestments} setFilter={setFilter} />

        <div className="groupInvestments">
        {filter &&
            filter.map((filtro, ind) => {
              return (
                <Investment
                key={ind}
                filtro={filtro}
                formCompleted={formCompleted}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};