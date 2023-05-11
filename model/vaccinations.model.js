const mongoose = require('mongoose');
const schema = mongoose.Schema;

// create vaccination schema & model
const vaccinationSchema = new schema(
    {
       vaccinationCode:Number,
       name:String,
       producer:String
    });

    vaccinationSchema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    
    //create object 
    const Vaccination = mongoose.model('Vaccination', vaccinationSchema);
    //create colection 
    Vaccination.createCollection().then(function (collection) {
        console.log('Collection vaccination is created!');
    });
    Vaccination.createIndexes();
    
    module.exports = Vaccination;