const express = require("express");
const jobRouter = express.Router();

const {protectRoute,checkInput} = require("../controllers/authController");
const {createJob, getAllJobs, deleteJob} = require("../controllers/jobController");

jobRouter.route("/new").post(checkInput, protectRoute, createJob);
jobRouter.route("").get(protectRoute, getAllJobs);
jobRouter.route("/:job_id").delete(protectRoute, deleteJob);

module.exports = jobRouter;