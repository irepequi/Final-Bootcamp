const connection = require("../config/db");

// TRAE LOS DATOS DE GRAFICAS

class graphicsControllers {
  getGraphics = (req, res) => {
    const { id } = req.params;

    //recogemos la fecha
    let date = new Date();
    let year = date.getFullYear();

    let sql = `SELECT * from investment WHERE user_id = ${id} and year_id = ${year}`;

    connection.query(sql, (error, result) => {
      console.log(error);
      console.log(result);
      error
        ? res.status(400).json({ error })
        : res.status(200).json({ result });
    });
  };
}
module.exports = new graphicsControllers();
