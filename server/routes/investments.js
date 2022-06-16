var express = require("express");
var router = express.Router();
var InvestmentsController = require("../controllers/InvestmentsController");

///-----------------------------------------------------------------  INVERSIONES
//4.- Traer todas las inversiones
//localhost:4000/investments/getAllInvestments
router.get("/getAllInvestments", InvestmentsController.getAllInvestments);

//5.- Traer todas los sectores
//localhost:4000/investments/getAllSectors
router.get("/getAllSectors", InvestmentsController.getAllSectors);

//6. borrado logico de inversiones
//--------------------------------------------
router.put("/desableInvestments/:id", InvestmentsController.desableInvestments);

//7.- habilita un inversiones
//--------------------------------------------
router.put("/enableInvestments/:id", InvestmentsController.enableInvestments);

//8.- coge la info de una inversion
//--------------------------------------------
router.get("/getEditInvestment/:id", InvestmentsController.getEditInvestment);

//9.- edita la info de una inversion
//--------------------------------------------
router.put("/editInvestment/:id", InvestmentsController.editInvestment);

module.exports = router;
