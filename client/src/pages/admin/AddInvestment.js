import React from "react";
import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

export const AddInvestment = () => {
  const [addInvestment, setAddInvestment] = useState({
    company: "",
    geographic_focus: "",
    style: "",
    lps: "",
    moic: "",
    gross_fund_size: "",
    sector_name: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/admin/addOneInvestment", addInvestment)
      .then((res) => {
        navigate("/adminInvestments");
      })
      .catch((error) => {
        console.log("error");
      });
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddInvestment({ ...addInvestment, [name]: value });
  };

  return (
    <div className="body">
      <form encType="multipart/form" className="d-flex flex-column w-50">
        <h2>Add Investment</h2>
        <div className="form_group field">
          <input
            type="text"
            className="form_field"
            placeholder="sector"
            autoComplete="off"
            name="sector_name"
            value={addInvestment.sector_name}
            onChange={handleChange}
          />
          <label className="form_label" for="sector">
            Sector <span className="required">*</span>
          </label>
        </div>

        <div className="form_group field">
          <input
            type="text"
            className="form_field"
            placeholder="company"
            name="company"
            value={addInvestment.company}
            onChange={handleChange}
            autoComplete="off"
          />
          <label className="form_label" for="sector">
            Company <span className="required">*</span>
          </label>
        </div>

        <div className="form_group field">
          <input
            type="text"
            className="form_field"
            placeholder="geographic focus"
            name="geographic_focus"
            value={addInvestment.geographic_focus}
            onChange={handleChange}
            autoComplete="off"
          />
          <label className="form_label" for="sector">
            Geographic focus <span className="required">*</span>
          </label>
        </div>

        <div className="form_group field">
          <input
            type="text"
            className="form_field"
            placeholder="style"
            name="style"
            onChange={handleChange}
            value={addInvestment.style}
            autoComplete="off"
          />
          <label className="form_label" for="sector">
            Style <span className="required">*</span>
          </label>
        </div>

        <div className="form_group field">
          <input
            type="text"
            className="form_field"
            placeholder="lps"
            name="lps"
            onChange={handleChange}
            value={addInvestment.lps}
            autoComplete="off"
          />
          <label className="form_label" for="sector">
            LPS <span className="required">*</span>
          </label>
        </div>

        <div className="form_group field">
          <input
            type="text"
            className="form_field"
            placeholder="moic"
            name="moic"
            onChange={handleChange}
            value={addInvestment.moic}
            autoComplete="off"
          />
          <label className="form_label" for="sector">
            Moic <span className="required">*</span>
          </label>
        </div>

        <div className="form_group field">
          <input
            type="text"
            className="form_field"
            placeholder="gross_fund_size"
            name="gross_fund_size"
            onChange={handleChange}
            value={addInvestment.gross_fund_size}
            autoComplete="off"
          />
          <label className="form_label" for="sector">
            Groos Fund Size <span className="required">*</span>
          </label>
        </div>

        <div className="botones">
          <button
            className="boton_color_secundario"
            onClick={() => navigate("/adminInvestments")}
          >
            Cancel
          </button>
          <button type="onSubmit" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
};
