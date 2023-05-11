const express=require('express');
const controllerGet=require('../controller/getAll');
const router=express.Router();

 router.get("/",controllerGet.getUser);

 module.exports=router;