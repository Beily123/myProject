const db = require("../model/index");
const users = db.Users;

async function AddNewUser(req, res) {
    let userToAdd = req.body;
    console.log(userToAdd);
    
    //checking if the user exists
    let user = await users.find({ "userId": userToAdd.userId });
    console.log(user);

    if (user.length == 0) {
        try {
            let response = await users.create(userToAdd);
            console.log("insert user");
            console.log(response);
            res.status(200).send(response);
        }
        catch (ex) {
            console.log("i am error");
            res.status(500).send(ex);
        }
    }
    else {
        res.status(400).send("משתמש קיים")

    }

}

module.exports={AddNewUser}