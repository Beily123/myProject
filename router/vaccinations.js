const express=require('express');
const controllerVaccinations=require('../controller/vaccinations');
const router=express.Router();

 router.post("/addVaccination",controllerVaccinations.AddNewVaccination);

 module.exports=router;