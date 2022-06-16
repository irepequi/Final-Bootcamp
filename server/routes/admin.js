var express = require("express");
var router = express.Router();
var AdminController = require("../controllers/AdminControllers");

//---------------------------------------------------------------------  USUARIO
//1.- Traer los usuarios
//localhost:4000/admin/getAllUsers
router.get("/getAllUsers", AdminController.getAllUsers);

//2. borrado logico de users
//--------------------------------------------
router.put("/desableUser/:id", AdminController.desableUser);
module.exports = router;

//3.- habilita un usuario
//--------------------------------------------
router.put("/enableUser/:id", AdminController.enableUser);

//-----------------------------------------------------------------  INVERSIONES
//4.- Traer todas las inversiones
//localhost:4000/admin/getAllInvestments
router.get("/getAllInvestments", AdminController.getAllInvestments);

//5.- Traer todas los sectores
//localhost:4000/admin/getAllSectors
router.get("/getAllSectors", AdminController.getAllSectors);

//6. borrado logico de inversiones
//--------------------------------------------
router.put("/desableInvestments/:id", AdminController.desableInvestments);

//7.- habilita un inversiones
//--------------------------------------------
router.put("/enableInvestments/:id", AdminController.enableInvestments);

//8.- coge la info de una inversion
//--------------------------------------------
router.get("/getEditInvestment/:id", AdminController.getEditInvestment);

//9.- edita la info de una inversion
//--------------------------------------------
router.put("/editInvestment/:id", AdminController.editInvestment);

//10.- Añade una Inversion.
//localhost:4000/admin/addOneInvestments
router.post("/addOneInvestment", AdminController.addOneInvestment);

module.exports = router;
