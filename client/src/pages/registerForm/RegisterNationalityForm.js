import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { LineaBolitasForm } from "../../components/LineaBolitasForm";


export const RegisterNationalityForm = ({ stepForm, setStepForm }) => {
  const [url, setUrl] = useState();
  const [userId, setUserId] = useState();
  const [message, setMessage] = useState();
  const [inputSelect, setinputSelect] = useState();
  const [nationality, setNationality] = useState({
    nationality: "",
    legal_identification: "",
    type: "Spain NIF",
    proof_id: "",
  });

  // Recoje la información del getNationality si están los campos  rellenos
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const user_id = jwtDecode(token).user.id;
      setUserId(user_id);
      setUrl(`http://localhost:4000/users/updateNationality/${user_id}`);
      axios
        .get(`http://localhost:4000/users/getNationality/${user_id}`)
        .then((res) => {
          if (res.data.result.length === 0) {
            setUrl(`http://localhost:4000/users/createNationality/${user_id}`);
          } else {
            setNationality(res.data.result[0]);
            setinputSelect(res.data.result[0].type);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNationality({ ...nationality, [name]: value });
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      nationality.nationality === "" ||
      nationality.legal_identification === ""
    ) {
      setMessage("There are some empty fields");
    } else {
      axios
        .post(url, nationality)
        // ..post(`http://localhost:4000/users/updateNationality/:id}`, nationality)
        .then((res) => {
          navigate("/proofId");
          setStepForm(4);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
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
                    <h2>ID Documents</h2>
                    <p>
                      We need this information to speed up the verification
                      process. The more information you provide, the more likely
                      we will be able to quickly verify who you are.
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
                          name="nationality"
                          placeholder="Introduce your nationality"
                          autoComplete="off"
                          id="nationality"
                          value={nationality.nationality}
                          onChange={handleChange}
                          required
                        />
                        <label className="form_label" htmlFor="nationality">
                          Nationality <span className="required">*</span>
                        </label>
                      </div>
                      <div className="form_group field">
                        <input
                          className="form_field"
                          type="text"
                          name="legal_identification"
                          placeholder="Introduce your id number"
                          autoComplete="off"
                          id="legal_identification"
                          value={nationality.legal_identification}
                          onChange={handleChange}
                          required
                        />
                        <label
                          className="form_label"
                          htmlFor="legal_identification"
                        >
                          Id number <span className="required">*</span>
                        </label>
                      </div>
                      <label htmlFor="type">Choose your document type</label>
                      <select
                        name="type"
                        value={nationality.type}
                        onChange={handleChange}
                      >
                        <option value="spain_nif">Spain NIF</option>
                        <option value="id_card">ID card</option>
                        <option value="passport">Passport</option>
                        <option value="driving_license">Driving license</option>
                      </select>
                    </form>
                    {/* MENSAJE DE ERROR  */}
                    <p className="required">{message}</p>
                  </Col>

                  <Col md={12}>
                    <div className="botones">
                      <button
                        className="boton_morado_secundario"
                        onClick={() => {
                          navigate("/job");
                          setStepForm(2);
                        }}
                      >
                        <span className="material-symbols-outlined">
                          arrow_back
                        </span>{" "}
                        Back
                      </button>
                      <button onClick={handleSubmit}>
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
  );
};
