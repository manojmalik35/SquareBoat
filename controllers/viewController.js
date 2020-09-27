const jobModel = require("../models/jobModel");
const userModel = require("../models/userModel");

module.exports.getHomePage = function (req, res) {
    res.render("home.pug", {
        title: "Home Page"
    });
}

module.exports.getSignUpPage = function (req, res) {
    const user = req.user;
    res.render("signup.pug", {
        title: "Signup Page"
    });
}

module.exports.getLoginPage = function (req, res) {
    res.render("login.pug", {
        title: "Login Page"
    });
}

module.exports.getProfilePage = function (req, res) {
    const user = req.user;
    if (user)
        res.render("profile.pug", { user: user })
    else
        res.redirect("/");
}

module.exports.getNewJobPage = function (req, res) {
    const user = req.user;
    if (user) {
        res.render("newjob.pug", {
            title: "Post New Job",
            user: user
        })
    } else
        res.redirect("/");
}

module.exports.getJobsPage = async function (req, res) {
    const user = req.user;
    if (user) {
        let jobs;
        let type = req.params.type;
        if (user.role == "Recruiter") {
            jobs = await jobModel.find({ postedBy: user["_id"] });
            res.render("jobs.pug", { title: "Posted Jobs", user, jobs});
        } else if (type == "applied") {

            let jobsPromise = [];
            user.appliedJobs.map(id => {
                let jobPromise = jobModel.findById(id);
                jobsPromise.push(jobPromise);
            })
            jobs = await Promise.all(jobsPromise);
            res.render("jobs.pug", { title: "Applied Jobs", user, jobs});
        } else {
            jobs = await jobModel.find({});
            let appliedJobs = user.appliedJobs;
            jobs = jobs.filter(job => {
                return !appliedJobs.includes(job["_id"]);
            })
            jobs.forEach(function (job) {
                job.isAvailable = true;
            });
            res.render("jobs.pug", { title: "Available Jobs", user, jobs});
        }
        
    } else
        res.redirect("/");
}



module.exports.getCandidatePage = async function (req, res) {
    let user = req.user;
    if (user) {
        let job_id = req.params.id;
        let job = await jobModel.findById(job_id);

        let candidatesPromise = [];
        job.appliedBy.map(function (id) {
            let candidatePromise = userModel.findById(id);
            candidatesPromise.push(candidatePromise);
        })
        let candidates = await Promise.all(candidatesPromise);

        // console.log(candidates);
        res.render("candidates.pug", {
            title: "Applied candidates",
            candidates: candidates,
            user : user
        })
    } else
        res.redirect("/");
}