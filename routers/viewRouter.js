const express = require("express");
const viewRouter = express.Router();

const { getHomePage, getSignUpPage, getLoginPage, getProfilePage, getNewJobPage, getJobsPage, getCandidatePage} = require("../controllers/viewController");
const { protectRoute, logOut} = require("../controllers/authController");

viewRouter.route("").get(getHomePage);
viewRouter.route("/signup").get(getSignUpPage);
viewRouter.route("/login").get(getLoginPage);
viewRouter.route("/logout").get(logOut);
viewRouter.route("/me").get(protectRoute, getProfilePage);
viewRouter.route("/newjob").get(protectRoute, getNewJobPage);
viewRouter.route("/jobs").get(protectRoute, getJobsPage);
viewRouter.route("/jobs/:type").get(protectRoute, getJobsPage);
viewRouter.route("/candidates/:id").get(protectRoute, getCandidatePage);

module.exports = viewRouter;