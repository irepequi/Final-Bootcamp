var express = require("express");
const graphicsControllers = require("../controllers/graphicsControllers");
var router = express.Router();

//1.- Pedir datos a la bbdd de la tabla inversor_investment_fund
//localhost:4000/graphics/getdata/:id 2

router.get("/getdata/:id", graphicsControllers.getGraphics);
//-------------------------------------------------------

module.exports = router;
