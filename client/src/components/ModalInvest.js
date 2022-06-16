import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export const ModalInvest = ({ show, setShow, investment_id }) => {
  const [amount, setAmount] = useState("");

  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAmount({ ...amount, [name]: value });
  };

  const handleSubmit = () => {
    const token = window.localStorage.getItem("token");
    const user_id = jwtDecode(token).user.id;

    axios
      .post(
        `http://localhost:4000/users/amountInvest/${user_id}/${investment_id}`,
        amount
      )
      .then((res) => {
        setAmount("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form_group field">
            <input
              className="form_field"
              type="text"
              name="amount"
              placeholder="Amount"
              autoComplete="off"
              id="amount"
              value={amount.amount}
              onChange={handleChange}
              required
            />
            <label className="form_label" htmlFor="amount">
              Amount (figures) <span className="required">*</span>
            </label>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button className="boton_color_secundario" onClick={handleClose}>
            Close
          </button>

          <button
           
            onClick={() => {
              handleClose();
              handleSubmit();
            }}
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
