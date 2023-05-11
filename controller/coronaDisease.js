const db = require("../model/index");
const coronaDiseases = db.CoronaDisease;
const users = db.Users;

async function AddNewCoronaDisease(req, res) {
    let coronaDiseaseToAdd = req.body;
    console.log(coronaDiseaseToAdd);

    //checking if the user exists
    let user = await users.find({ "userId": coronaDiseaseToAdd.userId });

    if (user.length != 0) {
        //checking if the user has disease 
        let corona = await coronaDiseases.find({ "userId": user[0]._id });
        console.log(user);

        if (corona.length == 0) {
            let coronaDiseaseToAdd = { "userId": user[0]._id, "datePositiveResult": coronaDiseaseToAdd.datePositiveResult, "dateRecoveryFromDisease": coronaDiseaseToAdd.dateRecoveryFromDisease }
            console.log(coronaDiseaseToAdd);
            try {
                let response = await coronaDiseases.create(coronaDiseaseToAdd);
                console.log("insert coronaDisease");
                console.log(response);
                res.status(200).send(response);
            }
            catch (ex) {
                console.log("i am error");
                res.status(500).send(ex);
            }
        }
        else {
            res.status(400).send("ישנם נתוני תחלואה על המשתמש")
        }
    }
    else {
        res.status(400).send("משתמש לא קיים")

    }

}

module.exports = { AddNewCoronaDisease }