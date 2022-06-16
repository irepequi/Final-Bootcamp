const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class InvestmentsController {
  //-------------------------------------------------
  //1.- coge la info de una inversion
  //localhost:4000/investments/getEditInvestment/:id
  getEditInvestment = (req, res) => {
    let sql = "SELECT * FROM investment_fund";

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }
      res.status(200).json(result);
    });
  };

  //-------------------------------------------------
  //2.- edita la info de una inversion
  //localhost:4000/investments/editInvestment/:id
  editInvestment = (req, res) => {
    const {
      investment_sector_id,
      company,
      geographic_focus,
      style,
      lps,
      moic,
      gross_fund_size,
    } = req.body;
    const id = req.params.investment_fund_id;

    let sql = `UPDATE investment_fund SET investment_sector_id=${investment_sector_id}, company='${company}', geographic_focus = '${geographic_focus}', style = '${style}', lps = '${lps}', moic = '${moic}', gross_fund_size = '${gross_fund_size}' WHERE investment_fund_id = ${id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //4.- Trae todos los datos de todas las inversiones
  //localhost:4000/admin/getAllInvestments
  getAllInvestments = (req, res) => {
    let sql = "SELECT * FROM investment_fund ";

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }
      res.status(200).json(result);
    });
  };

  //5.- Trae todos los datos de todas los sectores
  //localhost:4000/admin/getAllSectors
  getAllSectors = (req, res) => {
    let sql = "SELECT * FROM investment_sector";

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }
      res.status(200).json(result);
    });
  };

  //-------------------------------------------------
  // 6.- desahibilita un investments de manera lógica
  //localhost:4000/admin/desableUser/:userId

  desableInvestments = (req, res) => {
    let { id } = req.params;

    let sql = `UPDATE investment_fund SET deleted = 1 WHERE investment_fund_id = "${id}"`;
    let sql2 = "SELECT * from investment_fund";

    connection.query(sql, (error, result) => {
      if (error) throw error;
      console.log(error);
    });
    connection.query(sql2, (error, resultUsers) => {
      error
        ? res.status(400).json({ error })
        : res.status(200).json(resultUsers);
    });
  };

  //-------------------------------------------------
  // 7.- habilita un investment de manera lógica
  //localhost:4000/admin/enableUser/:userId

  enableInvestments = (req, res) => {
    let { id } = req.params;

    let sql = `UPDATE investment_fund SET deleted = 0 WHERE investment_fund_id = "${id}"`;
    let sql2 = "SELECT * from investment_fund";

    connection.query(sql, (error, result) => {
      if (error) throw error;
      console.log(error);
    });
    connection.query(sql2, (error, resultInvestments) => {
      error
        ? res.status(400).json({ error })
        : res.status(200).json(resultInvestments);
    });
  };

  //-------------------------------------------------
  //9.- coge la info de una inversion
  //localhost:4000/investments/getEditInvestment/:id
  getEditInvestment = (req, res) => {
    let sql = `SELECT * FROM investment_fund WHERE investment_fund_id = "${id}"`;

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }
      res.status(200).json(result);
    });
  };

  //-------------------------------------------------
  //10.- edita la info de una inversion
  //localhost:4000/investments/editInvestment/:id
  editInvestment = (req, res) => {
    let id = req.params.investment_fund_id;

    const {
      investment_sector_id,
      company,
      geographic_focus,
      style,
      lps,
      moic,
      gross_fund_size,
    } = req.body;

    let sql = `UPDATE investment_fund SET investment_sector_id=${investment_sector_id}, company='${company}', geographic_focus = '${geographic_focus}', style = '${style}', lps = ${lps}, moic = ${moic}, gross_fund_size = ${gross_fund_size} WHERE investment_fund_id = "${id}"`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };
}
module.exports = new InvestmentsController();
