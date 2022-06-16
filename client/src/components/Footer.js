import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./scss/navbar.scss";

export const Footer = () => {
  return (
    <Container fluid>
      <Row className="footer">
        <Col md={2} className="colLogo">
          <div className="logoNavbar">
            <img src="./images/logo/logo-g.png" />
          </div>

          <div className="rrss">
            <div>
              <img src="./images/redes-sociales/facebook.png" />
            </div>
            <div>
              <img src="./images/redes-sociales/twitter.png" />
            </div>
            <div>
              <img src="./images/redes-sociales/linkedin.png" />
            </div>
            <div>
              <img src="./images/redes-sociales/instagram.png" />
            </div>
          </div>
        </Col>

        <Col md={1}></Col>

        <Col md={2}>
          <h5>About</h5>
          <p>The team</p>
          <p>Press</p>
          <p>Careers</p>
          <p>Contact</p>
        </Col>

        <Col md={2}>
          <h5>Limited Partners</h5>
          <p>Blog</p>
          <p>How Invertor works</p>
          <p>Types of funds</p>
          <p>Tax relief</p>
        </Col>

        <Col md={2}>
          <h5>Venture Capital Funds</h5>
          <p>Partner with Invertor</p>
          <p>EIS funds</p>
          <p>SEIS funds</p>
          <p>Banks</p>
        </Col>

        <Col md={2}>
          <h5>Legal</h5>
          <p>Privacy policy</p>
          <p>Terms of service</p>
          <p>Conflict of interest policy</p>
          <p>Data collection and storage</p>
          <p>Risk warning</p>
          <p>SFDR Statement</p>
        </Col>

        <Col md={1}></Col>
      </Row>
    </Container>
  );
};
