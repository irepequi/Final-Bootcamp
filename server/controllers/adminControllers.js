const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class AdminController {
  //1.- Trae todos los datos de todos los usuarios
  //localhost:4000/admin/getAllUsers

  getAllUsers = (req, res) => {
    let sql = "SELECT * FROM user ";

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }
      res.status(200).json(result);
    });
  };

  //-------------------------------------------------
  // 2.- desahibilita un usuario de manera lógica
  //localhost:4000/admin/desableUser/:userId

  desableUser = (req, res) => {
    let { id } = req.params;

    let sql = `UPDATE user SET deleted = 1 WHERE user_id = "${id}"`;
    let sql2 = "SELECT * from user";

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
  // 3.- habilita un usuario de manera lógica
  //localhost:4000/admin/enableUser/:userId

  enableUser = (req, res) => {
    let { id } = req.params;

    let sql = `UPDATE user SET deleted = 0 WHERE user_id = "${id}"`;
    let sql2 = "SELECT * from user";

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
 


//8.- coge la info de una inversion
  //localhost:4000/admin/getEditInvestment/:id
  getEditInvestment = (req, res) => {


    let id = req.params.id;
   

    let sql = `SELECT * FROM  investment_fund, investment_sector WHERE investment_fund_id=${id} 
    and investment_fund.investment_sector_id=investment_sector.investment_sector_id `;

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }
      res.status(200).json(result);
    });
  };






  //-------------------------------------------------
  //9.- edita la info de una inversion
  //localhost:4000/admin/editInvestment/:id
  editInvestment = (req, res) => {
    let id = req.params.id;

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

  //10.- Añade una nueva Inversión.
  //localhost:4000/admin/addOneInvestment

  addOneInvestment = (req, res) => {
    const {
      company,
      geographic_focus,
      style,
      lps,
      moic,
      gross_fund_size,
      sector_name,
    } = req.body;

    let investment_sector_id;

    let sql = `SELECT * FROM investment_sector WHERE sector_name=
    '${sector_name}'`;

    let sql1 = `INSERT INTO investment_sector(sector_name ) VALUES
    ('${sector_name}')`;

    let sql2 = `INSERT INTO investment_fund( investment_sector_id, company, geographic_focus, style, lps, moic, gross_fund_size) 
    VALUES ( ${investment_sector_id},
     '${company}', '${geographic_focus}', '${style}', ${lps},  ${moic}, ${gross_fund_size})`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      if (result[0]) {
        investment_sector_id = result[0].investment_sector_id;
        sql2 = `INSERT INTO investment_fund( investment_sector_id, company, geographic_focus, style, lps, moic, gross_fund_size) 
        VALUES ( ${investment_sector_id},
     '${company}', '${geographic_focus}', '${style}', ${lps},  ${moic}, ${gross_fund_size})`;
        connection.query(sql2, (error2, result2) => {
          if (error2) throw error2;
          error
            ? res.status(400).json({ error2 })
            : res.status(200).json(result2);
        });
      } else {
        connection.query(sql1, (error, result1) => {
          if (error) throw error;

          investment_sector_id = result1.insertId;
          if (error) {
            res.status(400).json({ error });
          }
          sql2 = `INSERT INTO investment_fund( investment_sector_id, company, geographic_focus, style, lps, moic, gross_fund_size) 
      VALUES(${investment_sector_id},
     '${company}', '${geographic_focus}', '${style}', ${lps},  ${moic}, ${gross_fund_size})`;

          connection.query(sql2, (error, result2) => {
            if (error) throw error;
            error
              ? res.status(400).json({ error })
              : res.status(200).json(result2);
          });
        });
      }
    });
  };
}
module.exports = new AdminController();
