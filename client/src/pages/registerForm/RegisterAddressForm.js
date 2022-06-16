import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { LineaBolitasForm } from "../../components/LineaBolitasForm";


export const RegisterAddressForm = ({ stepForm, setStepForm }) => {
  const [url, setUrl] = useState();
  const [message, setMessage] = useState();
  const [inputBool, setInputBool] = useState("true");
  const [userId, setUserId] = useState();
  const [address, setAddress] = useState({
    address: "",
    city: "",
    province: "",
    country: "",
    postal_code: "",
    physical_residence: 1,
    proof_address: "",
  });

  // Recoje la información del getAddress si están los campos  rellenos
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const user_id = jwtDecode(token).user.id;

      setUserId(user_id);
      setUrl(`http://localhost:4000/users/updatAddress/${user_id}`);

      axios
        .get(`http://localhost:4000/users/getAddress/${user_id}`)

        .then((res) => {
          if (res.data.result.length === 0) {
            setUrl(`http://localhost:4000/users/creatAddress/${user_id}`);
          }

          if (res.data.result.length !== 0) {
            setAddress(res.data.result[0]);
            res.data.result[0].physical_residence === 0 &&
              setInputBool("false");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleChange2 = (e) => {
    let booleano = address.physical_residence;
    if (e.target.value === "true") {
      booleano = 1;
      setInputBool("true");
    } else {
      booleano = 0;
      setInputBool("false");
    }
    setAddress({ ...address, [e.target.name]: booleano });
  };

  //NAVIGATE
  const navigate = useNavigate();

  //  HANDLESUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      address.address === "" ||
      address.city === "" ||
      address.province === "" ||
      address.country === "" ||
      address.postal_code === ""
    ) {
      setMessage("There are some empty fields");
    } else {
      axios
        .post(url, address)

        .then((res) => {
          navigate("/job");
          setStepForm(2);
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
                    {/* <h2 className="title">Address</h2> */}
                    <h2>Address</h2>
                    <p>
                      We use this information to verify your identity to protect
                      our platform against fraudulant use.
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
                          name="address"
                          placeholder="Introduce your address"
                          autoComplete="off"
                          id="address"
                          value={address.address}
                          onChange={handleChange}
                          required
                        />
                        <label className="form_label" htmlFor="address">
                          Address <span className="required">*</span>
                        </label>
                      </div>

                      <div className="groupInputs">
                        <div className="form_group field oneInput">
                          <input
                            className="form_field"
                            type="text"
                            name="city"
                            placeholder="Introduce your city"
                            autoComplete="off"
                            id="city"
                            value={address.city}
                            onChange={handleChange}
                            required
                          />
                          <label className="form_label" htmlFor="city">
                            City <span className="required">*</span>
                          </label>
                        </div>

                        <div className="form_group field oneInput">
                          <input
                            className="form_field"
                            type="text"
                            name="province"
                            placeholder="Introduce your province"
                            autoComplete="off"
                            id="province"
                            value={address.province}
                            onChange={handleChange}
                            required
                          />
                          <label
                            className="form_label"
                            htmlFor="birth_placebirth_place"
                          >
                            Province <span className="required">*</span>
                          </label>
                        </div>
                      </div>
                      <div className="groupInputs">
                        <div className="form_group field oneInput">
                          <input
                            className="form_field"
                            type="text"
                            name="postal_code"
                            placeholder="Introduce your postal code"
                            autoComplete="off"
                            id="postal_code"
                            value={address.postal_code}
                            onChange={handleChange}
                            required
                          />
                          <label className="form_label" htmlFor="postal_code">
                            Postal Code <span className="required">*</span>
                          </label>
                        </div>

                        <div className="form_group field oneInput">
                          <input
                            className="form_field"
                            type="text"
                            name="country"
                            placeholder="Introduce your country"
                            autoComplete="off"
                            id="country"
                            value={address.country}
                            onChange={handleChange}
                            required
                          />
                          <label className="form_label" htmlFor="country">
                            Country <span className="required">*</span>
                          </label>
                        </div>
                      </div>

                      <label>
                        Is it your physical residence?{" "}
                        <span className="required">*</span>
                      </label>
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
                    </form>
                    {/* MENSAJE DE ERROR  */}
                    <p className="required">{message}</p>
                  </Col>

                  <Col md={12}>
                    <div className="botones">
                      <button
                        className="boton_morado_secundario"
                        onClick={() => {
                          navigate("/data");
                          setStepForm(0);
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
