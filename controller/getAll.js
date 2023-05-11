const { Cursor } = require("mongoose");
const db = require("../model/index");
const coronaDiseases = db.CoronaDisease;
const users = db.Users;
const usersVaccines = db.UsersVaccines;
const vaccination = db.Vaccinations;

async function getUser(req, res) {
    //1
    //שליפת משתמש עם המחלות שלו
    // console.log(req.query);
    let id = req.query.userId;
    console.log(id);
    let ii = await users.find({ "userId": id });
    //console.log(ii);
    let x = ii[0]._id;
    let user=await coronaDiseases.findOne({"userId":x}).populate('userId');
    console.log(user);

    let u=user.userId;
    
    let t={"userId":u.userId,"name":u.name.firstName+" "+u.name.lastName,"address":u.address,
    "bornDate":u.bornDate,"phone":u.phone,"mobilePhone":u.mobilePhone,
    "datePositiveResult":user.datePositiveResult,"dateRecoveryFromDisease":user.dateRecoveryFromDisease}
    console.log("t",t);
    

    //שליפת חיסון עם הפרטים של החיסון והמשתמש
    let pat = await usersVaccines.findOne({ "userId": x }).populate('vaccines.vaccineId');
    
    console.log(pat);
    let vacArr=[];
    for (let i = 0; i < pat.vaccines.length; i++) {
        let t = pat.vaccines[i].date;
        let o = pat.vaccines[i].vaccineId;
        let vac = { "vaccinationCode": o.vaccinationCode, "name": o.name, "producer": o.producer, "date": t };
        vacArr.push(vac);
        //console.log("i=",i,vac);
    }
    t={...t,"vaccinations":vacArr};
    for (let i = 0; i < vacArr.length; i++) {
        console.log(i,vacArr[i]);
        
    }
    console.log("t=",t);
    res.send(t);
       // res.send(pat);

        //2
        // const query = [
        //     {
        //         $lookup: {
        //             from: 'Users',
        //             localField: 'userId',
        //             foreignField: '_id',
        //             as: 'user'
        //         }
        //     }
        // ];

        // const c = coronaDiseases.aggregate(query);

        // (await c).forEach(function(doc){
        //     console.log(doc);
        // },function(err){
        //     throw err;
        // })
        //     res.status(200).send(c);


        //3
        // (await coronaDiseases.aggregate([
        //     {
        //       $unwind: "$users"
        //     },
        //     {
        //       $group: {
        //         _id: "$_id",
        //         name: {$first: "$name"},
        //         //grades: {$push: "$grades"}
        //       }
        //     },
        //     {
        //       $project: {
        //         _id: 1,
        //         datePositiveResult: 1,
        //         users: {
        //           $map: {
        //             input: "$users",
        //             as: "user",
        //             in: {
        //               name: "$$user.name",
        //               address: "$$user.address"
        //             }
        //           }
        //         }
        //       }
        //     }
        //   ])).forEach(function(element) {
        //      console.log(element);
        //   },function(err){
        //     throw err;
        //   });
        //   res.send("kk")
    }

    module.exports = { getUser }