import "./App.css";
import { useEffect, useState } from "react";
import { AppRoutes } from "./routes/AppRoutes";

import jwtDecode from "jwt-decode";
import { applyStyles } from "@popperjs/core";

function App() {
  const [token, setToken] = useState();
  const [type, setType] = useState();
  const [userName, setUserName] = useState();
  const [img, setImg] = useState();

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if (token) {
      setToken(token);
      const type2 = jwtDecode(token).user.type;
      setType(type2);

      setUserName(jwtDecode(token).user.name);
      setImg(jwtDecode(token).user.avatar);
      setImg(jwtDecode(token).user.avatar);
    }
  }, []);

  return (
    <>
      <AppRoutes
        setToken={setToken}
        token={token}
        type={type}
        setType={setType}
        img={img}
        setImg={setImg}
      />
    </>
  );
}

export default App;
