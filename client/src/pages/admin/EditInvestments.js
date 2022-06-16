import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import axios from "axios";


export const EditInvestments = () => {
  const { id } = useParams();
  const [editInvestments, setEditInvestments] = useState({
    sector_name: "",
    company: "",
    geographic_focus: "",
    style: "",
    lps: "",
    moic: "",
    gross_fund_size: "",
  });

  const [message, setMessage] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/admin/getEditInvestment/${id}`)
      .then((res) => {
        console.log(res.data[0]);
        setEditInvestments(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditInvestments({ ...editInvestments, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:4000/admin/editInvestment/${id}`, editInvestments)
      .then((res) => {
        console.log(res);
        navigate("/adminInvestments");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="body">
          <form encType="multipart/form" className="d-flex flex-column w-50">
            <h2>Edit investment</h2>

            <div className="form_group field">
            <input
              type="text"
              className="form_field"
              placeholder="sector name "
              autoComplete="off"
              name="sector_name"
              value={editInvestments.sector_name}
              onChange={handleChange}
            />
            <label className="form_label" for="sector">
                          Sector Name <span className="required">*</span>
                        </label>
        </div>

        <div className="form_group field">
            <input
              type="text"
              className="form_field"
              placeholder="company"
              name="company"
              value={editInvestments.company}
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
              value={editInvestments.geographic_focus}
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
              value={editInvestments.style}
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
              value={editInvestments.lps}
              autoComplete="off"
            />
            <label className="form_label" for="LPS">
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
              value={editInvestments.moic}
              autoComplete="off"
            />
           <label className="form_label" for="moic">
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
              value={editInvestments.gross_fund_size}
              autoComplete="off"
            />
            <label className="form_label" for="sector">
                          Groos Fund Size <span className="required">*</span>
                        </label>
        </div>

            {message}

            <div className="botones">

              <button
                type="onSubmit"
                className="boton_color_secundario"
                onClick={() => navigate("/adminInvestments")}
              >
                Cancel
              </button>
              <button type="onSubmit"  onClick={handleSubmit}>
                Save changes
              </button>
            </div>
          </form>
          </div>
  );
};






