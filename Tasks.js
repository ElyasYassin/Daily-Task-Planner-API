var mongoose = require('mongoose');
var Schema = mongoose.Schema;

try {
    mongoose.connect(String(process.env.DB), {useNewUrlParser: true, useUnifiedTopology: true}, () =>
        console.log("connected"));
}catch (error) {
    console.log(error)
    console.log("could not connect");
}

// Task schema
var TaskSchema = new Schema({
    "Title": {
        type: String,
        required: true
    },
    userID: { 
        type: String,
        required: true
    },
    "Description": {
        type: String,
        required: false
    },
    "Duedate": {
        type: Date, //Potentially change to string
    },
    "Duetime": {
        type: String,
    },
    "TaskCompletion": {

    },
    "Status": {
        type: Boolean,
        default: 0
    } 
});


// return the model
module.exports = mongoose.model('tasks', TaskSchema);