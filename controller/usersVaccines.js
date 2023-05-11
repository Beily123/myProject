const db = require("../model/index");
const usersVaccines = db.UsersVaccines;
const users = db.Users;
const vaccinations=db.Vaccinations;

async function AddNewUserVaccine(req, res) {
    let userVaccineToAdd = req.body;
    console.log(userVaccineToAdd);
    //checking if the user exists
    let user = await users.find({ "userId": userVaccineToAdd.userId });
    //checking if the vaccine exists
    let vaccine= await vaccinations.find({"vaccinationCode":userVaccineToAdd.vaccineCode})
    if (user.length != 0&&vaccine.length!=0) {
        //checking if the user Has been vaccinated 
        let userVaccine = await usersVaccines.find({ "userId": user[0]._id});
        console.log(userVaccine);
        if (userVaccine.length == 0) {
            userVaccineToAdd = { "userId": user[0]._id,"vaccines":[{"vaccineId":vaccine[0]._id,"date":userVaccineToAdd.date}]}
            console.log(userVaccineToAdd);
            try {
                let response = await usersVaccines.create(userVaccineToAdd);
                console.log("insert userVaccineToAdd");
                console.log(response);
                res.status(200).send(response);
            }
            catch (ex) {
                console.log("i am error");
                res.status(500).send(ex);
            }
        }
        else {
            console.log(userVaccine[0].vaccines);
            if (userVaccine[0].vaccines.length<4) {
                let i;
                let vacArr=[];
                for (i = 0; i < userVaccine[0].vaccines.length; i++){
                     vacArr[i]=userVaccine[0].vaccines[i];
                }
                vacArr[i]={"vaccineId":vaccine[0]._id,"date":userVaccineToAdd.date};
                
                try {
                    let response = await usersVaccines.updateOne({"userId":userVaccine[0].userId},{$set:{"vaccines":vacArr}});
                    console.log("insert userVaccineToAdd");
                    console.log(response);
                    res.status(200).send(response);
                }
                catch (ex) {
                    console.log("i am error");
                    res.status(500).send(ex);
                }
            }
            else{
                if(userVaccine[0].vaccines.length==4){
                    res.status(400).send("המשתמש התחסן 4 פעמים")
                }
            }
        }
    }
    else {
        if(user.length==0){
        res.status(400).send("משתמש לא קיים");
        }
        else{
            res.status(400).send("חיסון לא קיים");
        }
    }

}

module.exports = { AddNewUserVaccine }