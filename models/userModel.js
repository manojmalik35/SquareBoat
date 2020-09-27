const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name of the user"]
    },
    email: {
        type: String,
        unique: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        minlength: 8,
        required: [true, "Please enter your password"]
    },
    phone: {
        type: Number
    },
    role: {
        type: String,
        enum: ["Recruiter", "Candidate"],
        default: "Candidate"
    },
    appliedJobs : [String]
});

const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;