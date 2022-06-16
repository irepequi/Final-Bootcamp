var express = require("express");
const userControllers = require("../controllers/userControllers");
var router = express.Router();
const multerSingle = require("../middleware/multerSingle");


//1.- createUser --> RegisterForm
//localhost:4000/users/createUser
router.post("/createUser", multerSingle("user"), userControllers.createUser);
//-------------------------------------------------------

//2.-login
//localhost:4000/users/login
router.post("/login", userControllers.login);
//------------------------------------------------------


//3.- inversor_data --> RegisterDataForm
//trae los registros de data
//localhost:4000/users/getData/:id
router.get("/getData/:id", userControllers.getData);
//------------------------------------------------------

//4.- TRAE TODOS LOS REGISTROS DE UN USER -->
//localhost:4000/users/getUser/:id
router.get("/getUser/:id", userControllers.getUser);
//------------------------------------------------------

//5.-Crea los registros de data
//localhost:4000/users/updateUser_createData
router.post("/updateUser_createData", userControllers.updateUser_createData);
//------------------------------------------------------

//6.- actualiza los registros de data
//localhost:4000/users/updateUser_updateData
router.post("/updateUser_updateData", userControllers.updateUser_updateData);
//------------------------------------------------------

//7.- inversor_address --> RegisterAddressForm
//trae los registros de Address
//localhost:4000/users/getAddress/:id
router.get("/getAddress/:id", userControllers.getAddress);
//------------------------------------------------------

//8. inversor_address lo crea
router.post("/creatAddress/:id", userControllers.creatAddress);
//------------------------------------------------------

//9.actualizar address 
router.post("/updatAddress/:id", userControllers.updateAddress);
//------------------------------------------------------

//10.actualizar address y proof
router.post("/updatAddressProof/:id", multerSingle("proof_address"), userControllers.updateAddressProof);
//------------------------------------------------------


//11.- inversor_job --> RegisterJobForm
//trae los registros de JOB
//localhost:4000/users/getJob/:id
router.get("/getJob/:id", userControllers.getJob);
//------------------------------------------------------

//12.- inversor_job --> RegisterJobForm Crear
//localhost:4000/users/job/:id
router.post("/createJob/:id", userControllers.createJob);
//------------------------------------------------------

//13.actualizar job7
router.post("/updatJob/:id", userControllers.updateJob);
//------------------------------------------------------

//14.actualizar job y proof_income
router.post("/updateJobProof/:id", multerSingle("proof_income"), userControllers.updateJobProof);
//------------------------------------------------------


//15.- inversor_nationality --> RegisterNationalityForm
//trae los registros de nationality
//localhost:4000/users/getNationality/:id
router.get("/getNationality/:id", userControllers.getNationality);
//------------------------------------------------------

//16.- inversor_job --> nationality  Crear
//localhost:4000/users/job/:id
router.post("/createNationality/:id", userControllers.createNationality);
//------------------------------------------------------

//17. actualizar nationality
router.post("/updateNationality/:id", userControllers.updateNationality);
//------------------------------------------------------

//18. actualizar nationality y proof_id
router.post("/updateNationalityProof/:id", multerSingle("proof_id"), userControllers.updateNationalityProof);
//------------------------------------------------------

//19.- Final --> RegisterFinal
//trae los registros de todo
//localhost:4000/users/getFinal/:id
router.get("/getFinal/:id", userControllers.getFinal);
//------------------------------------------------------

//20.- actualizar Final
router.post("/updateFinal/:id", userControllers.updateFinal);
//------------------------------------------------------

//21.- DragDrop proof_address
//localhost:4000/users/proofAddress/:id
router.post("proofAddress/:id", userControllers.updateAddress);
//------------------------------------------------------

//22.- DragDrop proof_income
//localhost:4000/users/proofIncome/:id
router.post("proofIncome/:id", userControllers.updateJob);
//------------------------------------------------------

//23.- DragDrop proof_id
//localhost:4000/users/proofId/:id
router.post("/proofId/:id", userControllers.updateNationality);
//------------------------------------------------------

//24. subir resultados test
router.post("/sendResult/:id", userControllers.sendResult);
//------------------------------------------------------

//25.-Trae la información de un usuario (id en el token)
//localhost:4000/users/getUser/:id
router.get("/getUser/:id", userControllers.getUser);
//------------------------------------------------------

//26.- Trae la inversion de un usuario
//localhost:4000/users/getOneInvestment/:id
router.get("/getOneInvestment/:id", userControllers.getOneInvestment);
//------------------------------------------------------

//27.- Traer los datos de un sector
//localhost:4000/users/getOneSector/:id
router.get("/getOneSector/:sector_id", userControllers.getOneSector);
//------------------------------------------------------

//28.- Traer todos los datos de todas las inversiones filtradas
//localhost:4000/users/getAllInvestments
router.post("/getAllInvestments", userControllers.getAllInvestments);
//------------------------------------------------------

//29.- Traer todos los datos de todas las inversiones habilitadas
//localhost:4000/users/getAllInvestmentsEnable
router.get("/getAllInvestmentsEnable", userControllers.getAllInvestmentsEnable);
//------------------------------------------------------

//30.- Traer todos los datos de todas las inversiones habilitadas que tiene un usuario
//localhost:4000/users/getAllInvestmentsUser/:id
router.get("/getAllInvestmentsUser/:id", userControllers.getAllInvestmentsUser);
//------------------------------------------------------

//31.- Resgistra una nueva inversion en el usuario
//localhost:4000/users/amountInvest/:user_id/:investment_fund_id
router.post("/amountInvest/:user_id/:investment_fund_id",userControllers.amountInvest);

module.exports = router;
