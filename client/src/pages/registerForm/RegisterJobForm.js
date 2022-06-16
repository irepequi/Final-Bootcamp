import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { LineaBolitasForm } from "../../components/LineaBolitasForm";

export const RegisterJobForm = ({ stepForm, setStepForm }) => {
  const [url, setUrl] = useState();
  const [userId, setUserId] = useState();
  const [message, setMessage] = useState();

  const [inputBool, setInputBool] = useState("true");
  const [inputBool2, setInputBool2] = useState("true");
  const [job, setJob] = useState({
    occupation: "",
    employer_name: "",
    person_public_respon: 1,
    family_person_public_respon: 1,
    proof_income: "",
  });

  // Recoje la información del getJob si están los campos  rellenos
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const user_id = jwtDecode(token).user.id;

      setUserId(user_id);
      setUrl(`http://localhost:4000/users/updatJob/${user_id}`);

      axios
        .get(`http://localhost:4000/users/getJob/${user_id}`)

        .then((res) => {
          if (res.data.result.length === 0) {
            setUrl(`http://localhost:4000/users/createJob/${user_id}`);
          }

          if (res.data.result.length !== 0) {
            setJob(res.data.result[0]);
            res.data.result[0].person_public_respon === 0 &&
              setInputBool("false");
            res.data.result[0].family_person_public_respon === 0 &&
              setInputBool2("false");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleChange2 = (e) => {
    let booleano = job.person_public_respon;
    if (e.target.value === "true") {
      booleano = 1;
      setInputBool("true");
    } else {
      booleano = 0;
      setInputBool("false");
    }
    setJob({ ...job, [e.target.name]: booleano });
  };
  const handleChange3 = (e) => {
    let booleano = job.family_person_public_respon;
    if (e.target.value === "true") {
      booleano = 1;
      setInputBool2("true");
    } else {
      booleano = 0;
      setInputBool2("false");
    }
    setJob({ ...job, [e.target.name]: booleano });
  };
  //NAVIGATE
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (job.occupation === "" || job.employer_name === "") {
      setMessage("There are some empty fields");
    } else {
      axios
        .post(url, job)
        // ..post(`http://localhost:4000/users/updateJob/:ID}`, job)
        .then((res) => {
          navigate("/nationality");
          setStepForm(3);
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
                  <Col md={4} sm={12}>
                    {/* <h2 className="title">Personal Details</h2> */}
                    <h2>Occupation</h2>
                    <p>
                      We need this information to verify that you are eligible
                      for an investment with Invertor.
                    </p>
                    {/* <button className="boton_morado_link">Show more</button> */}
                  </Col>

                  {/* FORM */}
                  <Col md={8} sm={12}>
                    <form encType="multipart/form">
                      <div className="groupInputs">
                        <div className="form_group field oneInput">
                          <input
                            className="form_field"
                            type="text"
                            name="occupation"
                            placeholder="Introduce your occupation"
                            autoComplete="off"
                            id="occupation"
                            value={job.occupation}
                            onChange={handleChange}
                            required
                          />
                          <label className="form_label" htmlFor="occupation">
                            Occupation <span className="required">*</span>
                          </label>
                        </div>

                        <div className="form_group field oneInput">
                          <input
                            className="form_field"
                            type="text"
                            name="employer_name"
                            placeholder="Introduce your employer's name"
                            autoComplete="off"
                            id="employer_name"
                            value={job.employer_name}
                            onChange={handleChange}
                            required
                          />
                          <label className="form_label" htmlFor="employer_name">
                            Employer's name <span className="required">*</span>
                          </label>
                        </div>
                      </div>

                      <label>Are you a person of public responsability?</label>
                      <div>
                        <div>
                          <input
                            type="radio"
                            name="person_public_respon"
                            checked={inputBool === "true"}
                            value="true"
                            onChange={handleChange2}
                          />{" "}
                          YES
                        </div>
                        <div>
                          <input
                            type="radio"
                            name="person_public_respon"
                            checked={inputBool === "false"}
                            value="false"
                            onChange={handleChange2}
                          />{" "}
                          NO
                        </div>
                      </div>
                      <br />

                      <label>
                        Are you a family with a person of public responsability?
                      </label>
                      <div>
                        <div>
                          <input
                            type="radio"
                            name="family_person_public_respon"
                            checked={inputBool2 === "true"}
                            value="true"
                            onChange={handleChange3}
                          />{" "}
                          YES
                        </div>
                        <div>
                          <input
                            type="radio"
                            name="family_person_public_respon"
                            checked={inputBool2 === "false"}
                            value="false"
                            onChange={handleChange3}
                          />{" "}
                          NO
                        </div>
                      </div>
                    </form>
                    {/* MENSAJE DE ERROR  */}
                    <p className="required">{message}</p>
                  </Col>

                  <Col md={12}>
                    <div className="botones">
                      <button
                        className="boton_morado_secundario"
                        onClick={() => {
                          navigate("/address");
                          setStepForm(1);
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
