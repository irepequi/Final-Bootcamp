import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { LineaBolitasForm } from "../../components/LineaBolitasForm";

export const RegisterFinal = ({ setFormCompleted, stepForm, setStepForm }) => {
  const [url, setUrl] = useState();
  const [userId, setUserId] = useState();
  const [inputBool, setInputBool] = useState("true");
  const [inputBool1, setInputBool1] = useState("true");
  const [inputBool2, setInputBool2] = useState("true");
  const [inputSelect, setinputSelect] = useState();
  const [message, setMessage] = useState();
  const [final, setFinal] = useState({
    first_name: "",
    first_last_name: "",
    second_last_name: "",
    legal_name: "",
    email: "",
    phone: "",
    birth_place: "",
    birth_date: "",
    address: "",
    city: "",
    province: "",
    postal_code: "",
    country: "",
    physical_residence: 1,
    occupation: "",
    employer_name: "",
    person_public_respon: 1,
    family_person_public_respon: 1,
    nationality: "",
    legal_identification: "",
    type: "",
    proof_address: "",
    proof_income: "",
    proof_id: "",
  });

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const user_id = jwtDecode(token).user.id;

      setUserId(user_id);
      setUrl(`http://localhost:4000/users/updateFinal/${user_id}`);

      axios
        .get(`http://localhost:4000/users/getFinal/${user_id}`)

        .then((res) => {
          if (res.data.result.length !== 0) {
            setFinal(res.data.result[0]);

            setinputSelect(res.data.result[0].type);
            res.data.result[0].physical_residence === 0 &&
              setInputBool("false");
            res.data.result[0].person_public_respon === 0 &&
              setInputBool1("false");
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
    setFinal({ ...final, [name]: value });
  };

  const handleChange2 = (e) => {
    let booleano = final.physical_residence;
    if (e.target.value === "true") {
      booleano = 1;
      setInputBool("true");
    } else {
      booleano = 0;
      setInputBool("false");
    }
    setFinal({ ...final, [e.target.name]: booleano });
  };

  const handleChange3 = (e) => {
    let booleano = final.person_public_respon;
    if (e.target.value === "true") {
      booleano = 1;
      setInputBool1("true");
    } else {
      booleano = 0;
      setInputBool1("false");
    }
    setFinal({ ...final, [e.target.name]: booleano });
  };
  const handleChange4 = (e) => {
    let booleano = final.family_person_public_respon;
    if (e.target.value === "true") {
      booleano = 1;
      setInputBool2("true");
    } else {
      booleano = 0;
      setInputBool2("false");
    }
    setFinal({ ...final, [e.target.name]: booleano });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      final.first_name === "" ||
      final.first_last_name === "" ||
      final.email === "" ||
      final.phone === "" ||
      final.birth_place === "" ||
      final.birth_date === "" ||
      final.address === "" ||
      final.city === "" ||
      final.province === "" ||
      final.postal_code === "" ||
      final.country === "" ||
      final.occupation === "" ||
      final.employer_name === "" ||
      final.nationality === "" ||
      final.legal_identification === "" ||
      final.type === ""
    ) {
      setMessage("There are some empty fields");
    } else if (!final.email.includes("@")) {
      setMessage("It's not a correct email");
    } else {
      axios
        .post(url, final)
        // ..post(`http://localhost:4000/users/updatefinal/:id}`, final)
        .then((res) => {
          navigate("/home");
          setStepForm(8);
          setFormCompleted(2);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleSubmit2 = (e) => {
    e.preventDefault();

    axios
      .post(url, final)
      // ..post(`http://localhost:4000/users/updatefinal/:id}`, final)
      .then((res) => {
        navigate("/proofId");
        setStepForm(8);
        setFormCompleted(2);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSubmit3 = (e) => {
    e.preventDefault();

    axios
      .post(url, final)
      // ..post(`http://localhost:4000/users/updatefinal/:id}`, final)
      .then((res) => {
        navigate("/proofAddress");
        setStepForm(8);
        setFormCompleted(2);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSubmit4 = (e) => {
    e.preventDefault();

    axios
      .post(url, final)
      // ..post(`http://localhost:4000/users/updatefinal/:id}`, final)
      .then((res) => {
        navigate("/proofIncome");
        setStepForm(8);
        setFormCompleted(2);
      })
      .catch((error) => {
        console.log(error);
      });
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
                    {/* <h2 className="title">Address</h2> */}
                    <h2>Review</h2>
                    <p>
                      Please take a moment to review that all the information is
                      correct. Incorrect information can slow the verification
                      process.
                    </p>
                    {/* <button className="boton_morado_link">Show more</button> */}
                  </Col>

                  {/* FORM */}
                  <Col md={8}>
                    <form encType="multipart/form">
                      {/* NAME */}
                      <div className="editInput">
                        <div className="form_group field">
                          <input
                            className="form_field"
                            type="text"
                            name="first_name"
                            autoComplete="off"
                            id="nationality"
                            value={final.first_name}
                            onChange={handleChange}
                            required
                          />
                          <label className="form_label" htmlFor="first_name">
                            Name <span className="required">*</span>
                          </label>
                        </div>
                      </div>

                      {/* SURNAME */}
                      <div className="editInput">
                        <div className="form_group field">
                          <input
                            className="form_field"
                            type="text"
                            name="first_last_name"
                            autoComplete="off"
                            id="first_last_name"
                            value={final.first_last_name}
                            onChange={handleChange}
                            required
                          />
                          <label
                            className="form_label"
                            htmlFor="first_last_name"
                          >
                            Surname <span className="required">*</span>
                          </label>
                        </div>
                      </div>

                      {/* SURNAME 2 */}
                      <div className="editInput">
                        <div className="form_group field">
                          <input
                            className="form_field"
                            type="text"
                            name="second_last_name"
                            autoComplete="off"
                            value={final.second_last_name}
                            onChange={handleChange}
                            required
                          />
                          <label
                            className="form_label"
                            htmlFor="second_last_name"
                          >
                            Second Surname{" "}
                          </label>
                        </div>
                      </div>

                      {/* LEGALNAME  */}
                      <div className="editInput">
                        <div className="form_group field">
                          <input
                            className="form_field"
                            type="text"
                            name="legal_name"
                            autoComplete="off"
                            value={final.legal_name}
                            onChange={handleChange}
                            required
                          />
                          <label className="form_label" htmlFor="legal_name">
                            Legal Name
                          </label>
                        </div>
                      </div>

                      {/* EMAIL  */}
                      <div className="editInput">
                        <div className="form_group field">
                          <input
                            className="form_field"
                            type="text"
                            name="email"
                            autoComplete="off"
                            value={final.email}
                            onChange={handleChange}
                            required
                          />
                          <label className="form_label" htmlFor="email">
                            Email <span className="required">*</span>
                          </label>
                        </div>
                      </div>

                      {/* PHONE  */}
                      <div className="editInput">
                        <div className="form_group field">
                          <input
                            className="form_field"
                            type="text"
                            name="phone"
                            autoComplete="off"
                            value={final.phone}
                            onChange={handleChange}
                            required
                          />
                          <label className="form_label" htmlFor="phone">
                            Phone <span className="required">*</span>
                          </label>
                        </div>
                      </div>

                      {/* BIRTH PLACE  */}
                      <div className="editInput">
                        <div className="form_group field">
                          <input
                            className="form_field"
                            type="text"
                            name="birth_place"
                            autoComplete="off"
                            value={final.birth_place}
                            onChange={handleChange}
                            required
                          />
                          <label className="form_label" htmlFor="birth_place">
                            Birth Place <span className="required">*</span>
                          </label>
                        </div>
                      </div>

                      {/* BIRTH DATE  */}
                      <div className="editInput">
                        <div className="form_group field">
                          <input
                            className="form_field"
                            type="date"
                            name="birth_date"
                            placeholder="YYYY/MM/DD"
                            id="birth_date"
                            value={final.birth_date}
                            onChange={handleChange}
                            required
                          />
                          <label className="form_label" htmlFor="birth_date">
                            Birth Date <span className="required">*</span>
                          </label>
                        </div>
                      </div>

                      {/* ADDRESS  */}
                      <div className="editInput">
                        <div className="form_group field">
                          <input
                            className="form_field"
                            type="text"
                            name="address"
                            autoComplete="off"
                            value={final.address}
                            onChange={handleChange}
                            required
                          />
                          <label className="form_label" htmlFor="address">
                            Street Address <span className="required">*</span>
                          </label>
                        </div>
                      </div>
                      {/* CITY  */}
                      <div className="editInput">
                        <div className="form_group field">
                          <input
                            className="form_field"
                            type="text"
                            name="city"
                            autoComplete="off"
                            value={final.city}
                            onChange={handleChange}
                            required
                          />
                          <label className="form_label" htmlFor="city">
                            City <span className="required">*</span>
                          </label>
                        </div>
                      </div>

                      {/* PROVINCE  */}
                      <div className="editInput">
                        <div className="form_group field">
                          <input
                            className="form_field"
                            type="text"
                            name="province"
                            autoComplete="off"
                            value={final.province}
                            onChange={handleChange}
                            required
                          />
                          <label className="form_label" htmlFor="province">
                            Province <span className="required">*</span>
                          </label>
                        </div>
                      </div>

                      {/* POSTAL CODE  */}
                      <div className="editInput">
                        <div className="form_group field">
                          <input
                            className="form_field"
                            type="text"
                            name="postal_code"
                            autoComplete="off"
                            value={final.postal_code}
                            onChange={handleChange}
                            required
                          />
                          <label className="form_label" htmlFor="postal_code">
                            Postal Code <span className="required">*</span>
                          </label>
                        </div>
                      </div>

                      {/* COUNTRY */}
                      <div className="editInput">
                        <div className="form_group field">
                          <input
                            className="form_field"
                            type="text"
                            name="country"
                            autoComplete="off"
                            value={final.country}
                            onChange={handleChange}
                            required
                          />
                          <label className="form_label" htmlFor="country">
                            Country <span className="required">*</span>
                          </label>
                        </div>
                      </div>

                      <label>Is it your physical residence ?</label>
                      <div>
                        <div>
                          <input
                            type="radio"
                            name="physical_residence"
                            checked={inputBool === "true"}
                            value="true"
                            onChange={handleChange2}
                          />{" "}
                          YES
                        </div>
                        <div>
                          <input
                            type="radio"
                            name="physical_residence"
                            checked={inputBool === "false"}
                            value="false"
                            onChange={handleChange2}
                          />{" "}
                          NO
                        </div>
                      </div>

                      {/* OCUPATION */}
                      <div className="editInput">
                        <div className="form_group field">
                          <input
                            className="form_field"
                            type="text"
                            name="occupation"
                            autoComplete="off"
                            value={final.occupation}
                            onChange={handleChange}
                            required
                          />
                          <label className="form_label" htmlFor="occupation">
                            Ocupation <span className="required">*</span>
                          </label>
                        </div>
                      </div>

                      {/* EMPLOYER NAME */}
                      <div className="editInput">
                        <div className="form_group field">
                          <input
                            className="form_field"
                            type="text"
                            name="employer_name"
                            autoComplete="off"
                            value={final.employer_name}
                            onChange={handleChange}
                            required
                          />
                          <label className="form_label" htmlFor="employer_name">
                            Employer <span className="required">*</span>
                          </label>
                        </div>
                      </div>

                      <label>Are you a person of public responsability?</label>
                      <div>
                        <div>
                          <input
                            type="radio"
                            name="person_public_respon"
                            checked={inputBool1 === "true"}
                            value="true"
                            onChange={handleChange3}
                          />{" "}
                          YES
                        </div>
                        <div>
                          <input
                            type="radio"
                            name="person_public_respon"
                            checked={inputBool1 === "false"}
                            value="false"
                            onChange={handleChange3}
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
                            onChange={handleChange4}
                          />{" "}
                          YES
                        </div>
                        <div>
                          <input
                            type="radio"
                            name="family_person_public_respon"
                            checked={inputBool2 === "false"}
                            value="false"
                            onChange={handleChange4}
                          />{" "}
                          NO
                        </div>
                      </div>

                      {/* NATIONALITY */}
                      <div className="editInput">
                        <div className="form_group field">
                          <input
                            className="form_field"
                            type="text"
                            name="nationality"
                            autoComplete="off"
                            value={final.nationality}
                            onChange={handleChange}
                            required
                          />
                          <label className="form_label" htmlFor="nationality">
                            Nationality <span className="required">*</span>
                          </label>
                        </div>
                      </div>

                      {/* NATIONALITY */}
                      <div className="editInput">
                        <div className="form_group field">
                          <input
                            className="form_field"
                            type="text"
                            name="legal_identification"
                            autoComplete="off"
                            value={final.legal_identification}
                            onChange={handleChange}
                            required
                          />
                          <label className="form_label" htmlFor="nationality">
                            {" "}
                            Number ID <span className="required">*</span>
                          </label>
                        </div>
                      </div>

                      <label>
                        Choose your document type
                        <span className="required">*</span>
                      </label>

                      <select
                        name="type"
                        value={final.type}
                        onChange={handleChange}
                      >
                        <option value="spain_nif">Spain NIF</option>
                        <option value="id_card">ID card</option>
                        <option value="passport">Passport</option>
                        <option value="driving_license">Driving license</option>
                      </select>

                      <br />
                      <p>{final.proof_id.split("-")[1]}</p>
                      <button onClick={handleSubmit2}>
                        Edit ID <span className="required">*</span>
                      </button>

                      <br />

                      <p>{final.proof_address.split("-")[1]}</p>
                      <button onClick={handleSubmit3}>
                        Edit Address <span className="required">*</span>
                      </button>

                      <br />

                      <br />

                      <p>{final.proof_income.split("-")[1]}</p>
                      <button onClick={handleSubmit4}>
                        Edit Income <span className="required">*</span>
                      </button>
                    </form>
                    {/* MENSAJE DE ERROR  */}
                    <p className="required">{message}</p>
                  </Col>

                  <Col md={12}>
                    <div className="botones">
                      <button
                        className="boton_morado_secundario"
                        onClick={() => {
                          navigate("/proofIncome");
                          setStepForm(6);
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
