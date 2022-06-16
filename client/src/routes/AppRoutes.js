import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

//ROUTES
import { NavBar } from "../components/NavBar";
import { Login } from "../pages/Auth/Login";
import { Home } from "../pages/home/Home";
import { UserHome } from "../pages/home/UserHome";

import { RegisterForm } from "../pages/registerForm/RegisterForm";
import { TestForms } from "../pages/testForm/TestForms";
import { RegisterDataForm } from "../pages/registerForm/RegisterDataForm";
import { RegisterAddressForm } from "../pages/registerForm/RegisterAddressForm";
import { RegisterJobForm } from "../pages/registerForm/RegisterJobForm";
import { RegisterNationalityForm } from "../pages/registerForm//RegisterNationalityForm";
import { RegisterFinal } from "../pages/registerForm//RegisterFinal";
import { RegisterProofAddress } from "../pages/registerForm//RegisterProofAddress";
import { RegisterProofId } from "../pages/registerForm//RegisterProofId";
import { RegisterProofIncome } from "../pages/registerForm//RegisterProofIncome";
import { Admin } from "../pages/admin/Admin";
import { AdminUsers } from "../pages/admin/AdminUsers";
import { AdminInvestments } from "../pages/admin/AdminInvestments";

import { UserInvestments } from "../pages/user/UserInvestments";
import { EditInvestments } from "../pages/admin/EditInvestments";
import { InvestmentOpportunities } from "../pages/user/InvestmentOpportunities";
import { VistaGraficas } from "../pages/user/VistaGraficas";
import { AddInvestment } from "../pages/admin/AddInvestment";


export const AppRoutes = ({ token, setToken, type, setType }) => {
  const [formCompleted, setFormCompleted] = useState(0);
  const [userId, setUserId] = useState();
  const [stepForm, setStepForm] = useState(0);
  const [userName, setUserName] = useState();
  const [img, setImg] = useState();

  useEffect(() => {
    const token2 = window.localStorage.getItem("token");

    if (token2) {
      const user_id = jwtDecode(token2).user.id;
      setUserId(user_id);
      const type2 = jwtDecode(token2).user.type;
      const user = jwtDecode(token2).user.name;
      const avatar = jwtDecode(token2).user.avatar;
      setType(type2);
      setUserName(user);
      setImg(avatar);

      axios
        .get(`http://localhost:4000/users/getUser/${userId}`)
        .then((res) => {
          setFormCompleted(res.data.result[0].test);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token]);

  return (
    <>
      <BrowserRouter>
        {/* NAVBAR */}
        <NavBar
          token={token}
          setToken={setToken}
          type={type}
          img={img}
          setImg={setImg}
          userName={userName}
          setUserName={setUserName}
        />
        <Routes>
          <Route path="/portfolio" element={<VistaGraficas />} />
          {!token && <Route path="/register" element={<RegisterForm />} />}
          {!token && (
            <Route
              path="/login"
              element={
                <Login
                  setType={setType}
                  setUserName={setUserName}
                  setToken={setToken}
                  formCompleted={formCompleted}
                />
              }
            />
          )}
          {!token && <Route path="/" element={<Home />} />}

          {token && type === 2 && (
            <>
              <Route
                path="/home"
                element={<UserHome formCompleted={formCompleted} />}
              />

              <Route
                path="/investmentOpportunities"
                element={
                  <InvestmentOpportunities formCompleted={formCompleted} />
                }
              />

              <Route path="/userInvestments" element={<UserInvestments />} />
              <Route
                path="/test"
                element={<TestForms setFormCompleted={setFormCompleted} />}
              />
              <Route
                path="/data"
                element={
                  <RegisterDataForm
                    stepForm={stepForm}
                    setStepForm={setStepForm}
                    formCompleted={formCompleted}
                  />
                }
              />
              <Route
                path="/address"
                element={
                  <RegisterAddressForm
                    stepForm={stepForm}
                    setStepForm={setStepForm}
                  />
                }
              />
              <Route
                path="/job"
                element={
                  <RegisterJobForm
                    stepForm={stepForm}
                    setStepForm={setStepForm}
                  />
                }
              />
              <Route
                path="/nationality"
                element={
                  <RegisterNationalityForm
                    stepForm={stepForm}
                    setStepForm={setStepForm}
                  />
                }
              />
              <Route
                path="/proofAddress"
                element={
                  <RegisterProofAddress
                    stepForm={stepForm}
                    setStepForm={setStepForm}
                  />
                }
              />
              <Route
                path="/proofId"
                element={
                  <RegisterProofId
                    stepForm={stepForm}
                    setStepForm={setStepForm}
                  />
                }
              />
              <Route
                path="/proofIncome"
                element={
                  <RegisterProofIncome
                    stepForm={stepForm}
                    setStepForm={setStepForm}
                  />
                }
              />
              <Route
                path="/final"
                element={
                  <RegisterFinal
                    setFormCompleted={setFormCompleted}
                    stepForm={stepForm}
                    setStepForm={setStepForm}
                  />
                }
              />
            </>
          )}

          {token && type === 1 && (
            <>
              <Route path="/admin" element={<Admin />} />
              <Route path="/adminUsers" element={<AdminUsers />} />
              <Route path="/adminInvestments" element={<AdminInvestments />} />
              <Route
                path="/editInvestments/:id"
                element={<EditInvestments />}
              />
              <Route path="/addOneInvestment" element={<AddInvestment />} />
            </>
          )}
          <Route
            path="*"
            element={
              <>
                <h1>Error</h1>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};
