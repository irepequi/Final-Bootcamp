import React, { useEffect, useState } from "react";

import axios from "axios";
import jwtDecode from "jwt-decode";
export const FilterHome = () => {
  const INVESTMENT = [
    { sector_name: 1, name: "Pharmaceuticals" },
    { sector_name: 2, name: "Banking" },
    { sector_name: 3, name: "Technologies" },
    { sector_name: 4, name: "Real state" },
  ];

  const [name, setName] = useState("");

  const [foundInvestment, setFoundInvestment] = useState(INVESTMENT);
  const filter = (e) => {
    const keyword = e.target.value;
    if (keyword !== "") {
      const results = INVESTMENT.filter((investment) => {
        return investment.name.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFoundInvestment(results);
    } else {
      setFoundInvestment(INVESTMENT);
    }
    setName(keyword);
  };
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const user_id = jwtDecode(token).user.id;

      setUserId(user_id);
      axios
        .get(`http://localhost:4000/users/getOneInvestment/${user_id}`)
        .then()
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  return (
    <div className="container">
      <input
        type="search"
        value={name}
        onChange={filter}
        className="input"
        placeholder="Filter"
      />
      <div className="investment-list">
        {foundInvestment && foundInvestment.length > 0 ? (
          foundInvestment.map((investment) => (
            <li key={investment} className="">
              <span className="investment">{investment}</span>
            </li>
          ))
        ) : (
          <h1>No results found!</h1>
        )}
      </div>
      <div>FilterHome</div>
    </div>
  );
};
