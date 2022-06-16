import React, { useEffect, useState } from "react";
import { PieGrafic } from "../../components/PieGrafic";
import { DonutGrafic } from "../../components/DonutGrafic";
import { LineGrafic } from "../../components/LineGrafic";
import { Col, Row } from "react-bootstrap";
import jwtDecode from "jwt-decode";
import "./scss/vistaGrafica.scss";

export const VistaGraficas = () => {
  const [userId, setUserId] = useState();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const user_id = jwtDecode(token).user.id;
    setUserId(user_id);
  }, []);

  return (
    <div className="containerWithoutLogo">
      <Row>
        <Col md={5} className="containerWhiteForm">
          <div className="graficasRedondas">
            <DonutGrafic userId={userId} />
          </div>
        </Col>

        <Col md={5} className="containerWhiteForm">
          <div className="graficasRedondas">
            <PieGrafic userId={userId} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="containerWhiteForm">
          <div className="graficaLine">
            <LineGrafic userId={userId} />
          </div>
        </Col>
      </Row>
    </div>
  );
};
