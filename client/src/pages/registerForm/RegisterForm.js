import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DragDrop from "../../components/hook/DragDrop";
//SCSS
import "../scss/style.scss";
import "../../components/scss/registerForm.scss";

export const RegisterForm = () => {
  const [message, setMessage] = useState();
  const navigate = useNavigate();
  //state para el registro
  const [register, setRegister] = useState({
    first_name: "",
    first_last_name: "",
    second_last_name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [file, setFile] = useState({
    avatar: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //guardar la img
    const formData = new FormData();
    formData.append("file", file);
    formData.append("register", JSON.stringify(register));

    if (
      register.first_name === "" ||
      register.first_last_name === "" ||
      register.phone === "" ||
      register.email === "" ||
      register.password === ""
    ) {
      setMessage("There are some empty fields");
    } else if (!register.email.includes("@")) {
      setMessage("It's not a correct email");
    } else {
      //guarda la info del user
      axios
        .post("http://localhost:4000/users/createUser", formData)
        .then((res) => {
          setRegister(res.data);

          navigate("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <div className="containerWithoutLogo">
        <div className="containerWhiteForm">
          <h2 className="title">Create an account</h2>

          <form encType="multipart/form">
            <div className="form_group field">
              <input
                className="form_field"
                type="text"
                name="first_name"
                placeholder="First name"
                autoComplete="off"
                id="name"
                value={register.first_name}
                onChange={handleChange}
                required="required"
              />
              <label className="form_label" htmlFor="name">
                Name <span className="required">*</span>
              </label>
            </div>

            <div className="groupInputs">
              <div className="form_group field oneInput">
                <input
                  className="form_field"
                  type="text"
                  name="first_last_name"
                  placeholder="First last name"
                  autoComplete="off"
                  id="first_last_name"
                  value={register.first_last_name}
                  onChange={handleChange}
                  required="required"
                />
                <label className="form_label" htmlFor="first_last_name">
                  First last name <span className="required">*</span>
                </label>
              </div>

              <div className="form_group field oneInput">
                <input
                  className="form_field"
                  type="text"
                  name="second_last_name"
                  placeholder="Second last name "
                  autoComplete="off"
                  id="second_last_name"
                  value={register.second_last_name}
                  onChange={handleChange}
                  required="required"
                />
                <label className="form_label" htmlFor="second_last_name">
                  Second last name
                </label>
              </div>
            </div>

            <div className="form_group field">
              <input
                className="form_field"
                type="text"
                name="phone"
                placeholder=" Phone"
                autoComplete="off"
                id="phone"
                value={register.phone}
                onChange={handleChange}
                required
              />
              <label className="form_label" htmlFor="phone">
                Phone <span className="required">*</span>
              </label>
            </div>

            <div className="groupInputs">
              <div className="form_group field oneInput">
                <input
                  className="form_field"
                  type="email"
                  name="email"
                  placeholder=" Email"
                  autoComplete="off"
                  id="email"
                  value={register.email}
                  onChange={handleChange}
                  required="required"
                />
                <label className="form_label" htmlFor="email">
                  Email <span className="required">*</span>
                </label>
              </div>

              <div className="form_group field oneInput">
                <input
                  className="form_field"
                  type="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="off"
                  id="password"
                  value={register.password}
                  onChange={handleChange}
                  required="required"
                />
                <label className="form_label" htmlFor="password">
                  Password <span className="required">*</span>
                </label>
              </div>
            </div>

            {/* //FILE */}
            <DragDrop setFile={setFile} setMessage={setMessage} />

            <br />
            {/* MENSAJE DE ERROR  */}
            <p className="required">{message}</p>

            <div className="botones">
              <button
                className="boton_color_secundario"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
              <button type="submit" onClick={handleSubmit}>
                Accept
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
