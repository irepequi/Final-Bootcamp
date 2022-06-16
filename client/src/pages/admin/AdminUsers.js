import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

//SCSS
import "../scss/style.scss";

export const AdminUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const handleEdit = (id, isdeleted) => {
    let url = `http://localhost:4000/admin/desableUser/${id}`;

    if (isdeleted === 1) {
      url = `http://localhost:4000/admin/enableUser/${id}`;
    }

    axios
      .put(url)
      .then((res) => {
        setAllUsers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/admin/getAllUsers")
      .then((res) => {
        setAllUsers(res.data);
      })
      .catch((error) => {
        console.log("error");
      });
  }, []);

  return (
    <>
      <div className="body">
        <h2>All users</h2>
      </div>
      <div className="table-responsive">
        {allUsers ? (
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>email</th>
                  <th></th>
                </tr>
              </thead>
              {allUsers.map((user, ind) => {
                if (user.type === 2) {
                  return (
                    <tbody>
                      <tr>
                        <td>{user.user_id}</td>
                        <td>{user.first_name}</td>
                        <td>{user.first_last_name}</td>
                        <td>{user.email}</td>
                        <td>
                          <button
                            variant="contained"
                            onClick={() =>
                              handleEdit(user.user_id, user.deleted)
                            }
                          >
                            {user.deleted === 0 ? "Disable" : "Enable"}
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  );
                }
              })}
            </Table>
          </div>
        ) : null}
      </div>
    </>
  );
};
