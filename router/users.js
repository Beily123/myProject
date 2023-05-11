const express=require('express');
const controllerUser=require('../controller/users');
const router=express.Router();

 router.post("/addUser",controllerUser.AddNewUser);

 module.exports=router;