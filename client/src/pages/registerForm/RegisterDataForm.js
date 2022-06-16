import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { LineaBolitasForm } from "../../components/LineaBolitasForm";

//SCSS
import "../../components/scss/registerForm.scss";

export const RegisterDataForm = ({ stepForm, setStepForm}) => {
  //STATES
  const [url, setUrl] = useState(
    "http://localhost:4000/users/updateUser_updateData"
  );
  const [userId, setUserId] = useState();
  const [empty, setEmpty] = useState(false);
  const [message, setMessage] = useState();
  const [dataUser, setDataUser] = useState();
 

  const [data, setData] = useState({
    legal_name: "",
    birth_place: "",
    birth_date: "",
  });

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if (token) {
      const user_id = jwtDecode(token).user.id;

      setUserId(user_id);

      axios
        .get(`http://localhost:4000/users/getUser/${user_id}`)
        .then((res) => {
          if (res.data.result.length !== 0) {
            setDataUser(res.data.result[0]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  //useEffext para traer los datos de data

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if (token) {
      const user_id = jwtDecode(token).user.id;

      setUserId(user_id);

      axios
        .get(`http://localhost:4000/users/getData/${user_id}`)
        .then((res) => {
          if (res.data.result.length === 0) {
            setUrl("http://localhost:4000/users/updateUser_createData");
          }
          if (res.data.result.length !== 0) {
            setData(res.data.result[0]);
          }
        })
        .catch((error) => {
          console.log(error);
          setEmpty(true);
        });
    }
  }, []);

  //NAVIGATE
  const navigate = useNavigate();

  // HANDLECHANGE de los input del user
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataUser({ ...dataUser, [name]: value });
  };

  //handlechange de los data
  const handleChangeData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // HANDLESUBMIT - envia la info a la BBDD
  const handleSubmit = (e) => {
    e.preventDefault();
    const registroTotal = { ...dataUser, data };

    if (
      data.first_name === "" ||
      data.first_last_name === "" ||
      data.birth_place === ""
    ) {
      setMessage("There are some empty fields");
    } else {
      axios
        .post(url, registroTotal)
        .then((res) => {
          navigate("/address");
          setStepForm(1);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      {dataUser && (
        <div>
          <Container fluid>
            <Row>
              <Col md={12}>
                <div className="containerWithoutLogo">
                  <div className="containerWhiteForm">
                    <Row>
                      {/* HEADER */}
                      <Col md={12}>
                        <div className="header">
                          <h4 className="title">Confirm your identity</h4>

                          {/* linea tiempo bolitas */}
                          <LineaBolitasForm stepForm={stepForm} />
                        </div>
                      </Col>

                      {/* TEXTO IZQ */}
                      <Col md={4}>
                        {/* <h2 className="title">Personal Details</h2> */}
                        <h2>Personal Details</h2>
                        <p>
                          We use this information to verify your identity to
                          protect our platform against fraudulant use.
                        </p>
                        {/* <button className="boton_morado_link">Show more</button> */}
                      </Col>

                      {/* FORM */}
                      <Col md={8}>
                        <form encType="multipart/form">
                          <div className="form_group field">
                            <input
                              className="form_field"
                              type="text"
                              name="first_name"
                              placeholder="name"
                              autoComplete="off"
                              id="name"
                              value={dataUser.first_name}
                              onChange={handleChange}
                              required
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
                                value={dataUser.first_last_name}
                                onChange={handleChange}
                                required
                              />
                              <label
                                className="form_label"
                                htmlFor="first_last_name"
                              >
                                First last name{" "}
                                <span className="required">*</span>
                              </label>
                            </div>

                            <div className="form_group field oneInput">
                              <input
                                className="form_field"
                                type="text"
                                name="second_last_name"
                                placeholder="Second last name"
                                autoComplete="off"
                                id="second_last_name"
                                value={dataUser.second_last_name}
                                onChange={handleChange}
                                required
                              />
                              <label
                                className="form_label"
                                htmlFor="second_last_name"
                              >
                                Second last name
                              </label>
                            </div>
                          </div>

                          <div className="form_group field">
                            <input
                              className="form_field"
                              type="text"
                              name="legal_name"
                              placeholder="Legal name"
                              autoComplete="off"
                              id="legal_name"
                              value={data.legal_name}
                              onChange={handleChangeData}
                              required
                            />
                            <label className="form_label" htmlFor="legal_name">
                              Legal name
                            </label>
                          </div>

                          <div className="groupInputs">
                            <div className="form_group field oneInput">
                              <input
                                className="form_field"
                                type="date"
                                name="birth_date"
                                placeholder="YYYY/MM/DD"
                                id="birth_date"
                                value={data.birth_date}
                                onChange={handleChangeData}
                                required
                              />
                              <label
                                className="form_label"
                                htmlFor="birth_date"
                              >
                                Birth Date <span className="required">*</span>
                              </label>
                            </div>

                            <div className="form_group field oneInput">
                              <input
                                className="form_field"
                                type="text"
                                name="birth_place"
                                placeholder="Birth_place"
                                autoComplete="off"
                                id="birth_place"
                                value={data.birth_place}
                                onChange={handleChangeData}
                              />
                              <label
                                className="form_label"
                                htmlFor="birth_placebirth_place"
                              >
                                Birth place <span className="required">*</span>
                              </label>
                            </div>
                          </div>
                        </form>
                        {/* MENSAJE DE ERROR  */}
                        <p className="required">{message}</p>
                      </Col>

                      <Col md={12}>
                        <div className="botones">
                          <button type="submit" onClick={handleSubmit}>
                            Accept{" "}
                            <span className="material-symbols-outlined">
                              arrow_forward
                            </span>
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};
