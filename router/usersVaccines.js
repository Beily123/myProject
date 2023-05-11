const express=require('express');
const controllerUserVaccines=require('../controller/usersVaccines');
const router=express.Router();

 router.post("/addUserVaccine",controllerUserVaccines.AddNewUserVaccine);
 //router.post("/addUserVaccine",()=>{console.log("i post");});

 module.exports=router;