import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

//SCSS
import "../scss/style.scss";
import "./scss/login.scss";

export const Login = ({ setType, setToken, setUserName, formCompleted }) => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (login.email === "" || login.pass === "" || !login.email.includes("@")) {
      setErrorMsg(true);
    } else {
      axios
        .post("http://localhost:4000/users/login", login)

        .then((res) => {
          //campturamos el token que nos manda el server
          const token = res.data.token;

          //añadimos al LocalStorage
          window.localStorage.setItem("token", token);
          setToken(token);
          const type = jwtDecode(token).user.type;
          const name = jwtDecode(token).user.name;
          setUserName();

          setType(type);

          //según el tipo de usuario nos redireccionara a una página u otra
          {
            type === 2 && formCompleted === 0
              ? navigate("/test", { replace: true })
              : type === 2 && formCompleted >= 1
              ? navigate("/home", { replace: true })
              : type === 1
              ? navigate("/admin", { replace: true })
              : navigate("/", { replace: true });
          }
        })

        .catch((error) => {
          console.log("Ha habido un error, Email o contraseña incorrecta");
          setErrorMsg(true);
        });
    }
  };

  return (
    <div className="login">
      <div className="containerWithoutLogo">
        <div className="containerWhiteForm">
          <h2 className="title">Login</h2>

          <div className="form_group field">
            <input
              className="form_field"
              placeholder="email"
              autoComplete="off"
              type="email"
              id="email"
              name="email"
              required
              value={login.email}
              onChange={handleChange}
            />
            <label className="form_label" htmlFor="name">
              Email
            </label>
          </div>

          <div className="form_group field">
            <input
              className="form_field"
              placeholder="password"
              autoComplete="off"
              type="password"
              id="id"
              name="password"
              required
              value={login.password}
              onChange={handleChange}
            />
            <label className="form_label" htmlFor="id">
              Password
            </label>
          </div>

          <button className="boton_morado" type="submit" onClick={handleSubmit}>
            login
          </button>

          {errorMsg && <p className="error">Incorrect user or password</p>}

          <p className="subtext">Aren't you registered?</p>
          <button
            className="boton_morado_link"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};
