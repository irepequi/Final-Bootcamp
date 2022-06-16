import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//SCSS
import "./scss/navbar.scss";

export const NavBar = ({ token, setToken, type, userName, img }) => {
  const navigate = useNavigate();
  const [letra, setLetra] = useState();

  const logOut = () => {
    setToken(null);
    window.localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Navbar expand="lg">
      <Container fluid>
        {token && type === 2 ? (
          <Navbar.Brand as={Link} to="/home">
            <div className="logoNavbar">
              <img src="./images/logo/logo-g.png" />
            </div>
          </Navbar.Brand>
        ) : token && type === 1 ? (
          <Navbar.Brand as={Link} to="/admin">
            <div className="logoNavbar">
              <img src="./images/logo/logo-g.png" />
            </div>
          </Navbar.Brand>
        ) : (
          <Navbar.Brand as={Link} to="/">
            <div className="logoNavbar">
              <img src="./images/logo/logo-g.png" />
            </div>
          </Navbar.Brand>
        )}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="navBar">
          <Nav>
            {token && type === 2 && (
              <div className="menu">
                <Nav.Link as={Link} to="/investmentOpportunities">
                  Investment opportunities
                </Nav.Link>

                <Nav.Link as={Link} to="/userInvestments">
                  Your Investments
                </Nav.Link>

                <Nav.Link as={Link} to="/portfolio">
                  Portfolio
                </Nav.Link>

                {img ? (
                  <div className="avatar">
                    <img src={`./images/user/${img}`} />
                  </div>
                ) : userName ? (
                  <div className="avatarLetra">
                    <p>{userName.charAt(0).toUpperCase()}</p>
                  </div>
                ) : null}
              </div>
            )}

            {token && type === 1 && (
              <div className="menu">
                <Nav.Link as={Link} to="/adminInvestments">
                  Investments
                </Nav.Link>

                <Nav.Link as={Link} to="/adminUsers">
                  Users
                </Nav.Link>
              </div>
            )}

            {!token ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="btnNavbar"
                >
                  Login
                </button>

                <button
                  onClick={() => navigate("/register")}
                  className="btnNavbar"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                <button className="boton_color_secundario" onClick={logOut}>
                  LogOut
                </button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
