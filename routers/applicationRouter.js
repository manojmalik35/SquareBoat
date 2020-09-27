const express = require("express");
const applicationRouter = express.Router();

const {protectRoute, checkInput} = require("../controllers/authController");
const {createApplication, viewAppliedByCandidates} = require("../controllers/applicationController");

applicationRouter.route("/new").post(checkInput, protectRoute, createApplication);
applicationRouter.route("/:job_id").get(protectRoute, viewAppliedByCandidates);

module.exports = applicationRouter;