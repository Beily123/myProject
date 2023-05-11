const mongoose=require("mongoose");
mongoose.Promise=global.Promise;

const DB={};
DB.mongoose=mongoose;
DB.url=process.env.URL;
DB.Users=require("./users.model");
DB.Vaccinations=require("./vaccinations.model");
DB.UsersVaccines=require("./usersVaccines.model");
DB.CoronaDisease=require("./coronaDisease.model");

module.exports=DB;