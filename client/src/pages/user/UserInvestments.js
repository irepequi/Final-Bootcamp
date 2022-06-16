import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Buscador } from "../../components/Buscador";

export const UserInvestments = () => {
  const [allInvestments, setAllInvestments] = useState([]);
  const [filter, setFilter] = useState();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const user_id = jwtDecode(token).user.id;

    axios
      .get(`http://localhost:4000/users/getAllInvestmentsUser/${user_id}`)
      .then((res) => {
        setAllInvestments(res.data);
        setFilter(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="table-responsive">
        <div className="body">
          <h1 className="">Your investments</h1>

          <Buscador
            setAllInvestments={setAllInvestments}
            allInvestments={allInvestments}
            setFilter={setFilter}
          />
        </div>
        {/* TABLE -------------------------------------------- */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Company</th>
              <th>Amount</th>
              <th>Year</th>
              <th>Month</th>
              <th>Sector</th>
              <th>Style</th>
              <th>Geographic focus</th>
            </tr>
          </thead>

          {filter &&
            filter.map((inversion, index) => {
              return (
                <tbody>
                  <tr>
                    <td>{inversion.company}</td>
                    <td>{inversion.amount}</td>
                    <td>{inversion.year_id}</td>
                    <td>{inversion.month_id + 1}</td>
                    <td>{inversion.sector_name}</td>
                    <td>{inversion.style}</td>
                    <td>{inversion.geographic_focus}</td>
                  </tr>
                </tbody>
              );
            })}
        </Table>
      </div>
    </>
  );
};
