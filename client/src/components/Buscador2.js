
import React, { useState } from "react";


export const Buscador2 = ({ allInvestments, setFilter }) => {
  const [search, setSearch] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    allInvestments &&
      setFilter(
        allInvestments.filter(
          (invest) =>
            invest.sector_name.toLowerCase().includes(search.toLowerCase()) ||
            invest.company.toLowerCase().includes(search.toLowerCase())
        )
      );
  };

  return (
    <>
      <form>
        <div className="body">
          <div className="form_group field">
            <input
              className="form_field"
              type="text"
              name="buscador"
              placeholder="search"
              autoComplete="off"
              onChange={handleChange}
              required
            />
            <label className="form_label">
              Search <span className="required">*</span>
            </label>
          </div>

          <button onClick={handleSubmit}>OK</button>
        </div>
      </form>
    </>
  );
};
