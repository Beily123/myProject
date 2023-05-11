const express=require('express');
const controllerCoronaDisease=require('../controller/coronaDisease');
const router=express.Router();

 router.post("/addCoronaDisease",controllerCoronaDisease.AddNewCoronaDisease);

 module.exports=router;