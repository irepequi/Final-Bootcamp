import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import DragDrop from "../../components/hook/DragDrop";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { LineaBolitasForm } from "../../components/LineaBolitasForm";

export const RegisterProofIncome = ({ stepForm, setStepForm }) => {
  const navigate = useNavigate();
  const [url, setUrl] = useState();
  const [userId, setUserId] = useState();
  const [message, setMessage] = useState();
  const [job, setJob] = useState({
    proof_income: "",
  });
  const [file, setFile] = useState({
    proof_income: "",
  });

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const user_id = jwtDecode(token).user.id;

      setUserId(user_id);
      setUrl(`http://localhost:4000/users/updateJobProof/${user_id}`);

      axios
        .get(`http://localhost:4000/users/getJob/${user_id}`)

        .then((res) => {
          if (res.data.result.length !== 0) {
            setFile(res.data.result[0].proof_income);
            setJob(res.data.result[0]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job", JSON.stringify(job));

    setMessage("There are some empty fields");
    axios
      .post(url, formData)
      // ..post(`http://localhost:4000/users/updateJob/:ID}`, job)
      .then((res) => {
        navigate("/final");
        setStepForm(7);
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
                    <h2>Proof income</h2>
                    <p>
                      To comply with KYC and AML requirements, we need to be
                      100% sure of your identity.
                    </p>
                    {/* <button className="boton_morado_link">Show more</button> */}
                  </Col>

                  {/* FORM */}
                  <Col md={8}>
                    <DragDrop setFile={setFile} setMessage={setMessage} />
                    {/* MENSAJE DE ERROR  */}
                    <p className="required">{message}</p>
                  </Col>

                  <Col md={12}>
                    <div className="botones">
                      <button
                        className="boton_morado_secundario"
                        onClick={() => {
                          navigate("/proofAddress");
                          setStepForm(5);
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
