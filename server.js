const express = require("express");
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors')
const fs = require('fs');
const routerUser=require('./router/users');
const routerVaccinations=require('./router/vaccinations');
const routerCoronaDiseases=require('./router/coronaDisease');
const routerUsersVaccines=require('./router/usersVaccines');
const routerGet=require('./router/getAll')

dotenv.config();
const db = require('./model');

//options to connect to database
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
};

db.mongoose.connect(process.env.URL, options)
    .then(() => {
        console.log("Connected to the database");
    })
    .catch(err => {
        console.log("Cannot connect to the database", err);
        process.exit();
    });

app.use(cors())

app.listen(process.env.PORT, () => console.log("server is up " + process.env.PORT));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users",routerUser);
app.use("/vaccinations",routerVaccinations);
app.use("/coronaDiseases",routerCoronaDiseases);
app.use("/usersVaccines",routerUsersVaccines);
app.use("/get",routerGet)
