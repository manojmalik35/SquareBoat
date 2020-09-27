const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter title of the job"]
    },
    description: String,
    package : Number,
    company : String,
    isOpen : {
        type : Boolean,
        default : true
    },
    postedBy : String,
    appliedBy : [String]
});

const jobModel = mongoose.model("jobModel", jobSchema);
module.exports = jobModel;