const db = require("../model/index");
const vaccinations = db.Vaccinations;

async function AddNewVaccination(req, res) {
    let vaccinationToAdd = req.body;
    console.log(vaccinationToAdd);
    
    //checking if the Vaccination exists
    let vaccination = await vaccinations.find({ "vaccinationCode": vaccinationToAdd.vaccinationCode });
    console.log(vaccination);

    if (vaccination.length == 0) {
        try {
            let response = await vaccinations.create(vaccinationToAdd);
            console.log("insert vaccination");
            console.log(response);
            res.status(200).send(response);
        }
        catch (ex) {
            console.log("i am error");
            res.status(500).send(ex);
        }
    }
    else {
        res.status(400).send("חיסון קיים")

    }

}

module.exports={AddNewVaccination};