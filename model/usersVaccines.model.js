const mongoose = require('mongoose');
const schema = mongoose.Schema;

// create users-vaccines schema & model
const usersVaccinesSchema = new schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Users'
        },
        vaccines:[
            {
                vaccineId:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref:'Vaccination'
                },
                date:Date
            }
        ]
    });

    usersVaccinesSchema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    
    //create object 
    const UsersVaccines = mongoose.model('UsersVaccines', usersVaccinesSchema);
    //create colection 
    UsersVaccines.createCollection().then(function (collection) {
        console.log('Collection usersVaccines is created!');
    });
    UsersVaccines.createIndexes();
    
    module.exports = UsersVaccines;