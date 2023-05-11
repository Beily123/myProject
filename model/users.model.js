const mongoose = require('mongoose');
const schema = mongoose.Schema;

// create users schema & model
const usersSchema = new schema(

    {
        name:{
            firstName:String,
            lastName:String
        },
        userId: {
            type: String,
            length: 9
        },
        address: {
            city: String,
            street: String,
            home: Number
        },
        bornDate: Date,
        phone: {
            type: String,
            minLength: 7,
        },
        mobilePhone: {
            type:String,
            minLength:10
        }
    }
);

usersSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

//create object 
const Users = mongoose.model('Users', usersSchema);
//create collection 
Users.createCollection().then(function (collection) {
    console.log('Collection users is created!');
});
Users.createIndexes();

module.exports = Users;