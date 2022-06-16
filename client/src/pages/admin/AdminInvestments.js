import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Buscador3 } from "../../components/Buscador3";

export const AdminInvestments = () => {
  const [allInvestments, setAllInvestments] = useState([]);
  const [allSectors, setAllSectors] = useState([]);
  const [filter, setFilter] = useState();

  const navigate = useNavigate();

  const handleEdit = (id, isdeleted) => {
    let url = `http://localhost:4000/admin/desableInvestments/${id}`;

    if (isdeleted === 1) {
      url = `http://localhost:4000/admin/enableInvestments/${id}`;
    }

    axios
      .put(url)
      .then((res) => {
        setAllInvestments(res.data);
        setFilter(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/admin/getAllInvestments")
      .then((res) => {
        setAllInvestments(res.data);
        setFilter(res.data);
      })
      .catch((error) => {
        console.log("error");
      });
  }, []);

  return (
    <div className="table-responsive">
      <div className="body">
        <h2>All investments</h2>

        <Buscador3 allInvestments={allInvestments} setFilter={setFilter} />

        <button
          onClick={() => {
            navigate("/addOneInvestment");
          }}
        >
          Add Investment
        </button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Company</th>
            <th>Geographic focus</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        {filter &&
          filter.map((inversion, index) => {
            return (
              <tbody>
                <tr>
                  <td>{inversion.investment_fund_id}</td>
                  <td>{inversion.company}</td>
                  <td>{inversion.geographic_focus}</td>
                  <td>
                    <button
                      variant="contained"
                      onClick={() =>
                        handleEdit(
                          inversion.investment_fund_id,
                          inversion.deleted
                        )
                      }
                    >
                      {inversion.deleted === 0 ? "Disable" : "Enable"}
                    </button>
                  </td>

                  <td>
                    <button
                      variant="contained"
                      onClick={() =>
                        navigate(
                          `/editInvestments/${inversion.investment_fund_id}`
                        )
                      }
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
      </Table>
    </div>
  );
};
