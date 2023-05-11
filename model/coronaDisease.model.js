const mongoose = require('mongoose');
const schema = mongoose.Schema;

// create Corona-disease schema & model
const coronaDiseaseSchema = new schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        },
        datePositiveResult: Date,
        dateRecoveryFromDisease: Date
    }
);

coronaDiseaseSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

//create object 
const CoronaDisease = mongoose.model('CoronaDisease', coronaDiseaseSchema);
//create colection 
CoronaDisease.createCollection().then(function (collection) {
    console.log('Collection coronaDisease is created!');
});
CoronaDisease.createIndexes();

module.exports = CoronaDisease;