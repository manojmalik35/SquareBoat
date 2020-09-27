const jobModel = require("../models/jobModel");

module.exports.createJob = async function (req, res) {
    try {

        let job = req.body;
        let user = req.user;
        if (user.role == "Recruiter") {
            job.postedBy = user["_id"];
            const newJob = await jobModel.create(job);
            res.json({
                success: true,
                newJob
            })
        } else {
            res.json({
                message: "You are not authorized to post a job."
            })
        }

    } catch (err) {
        res.json({
            err
        })
    }
}

module.exports.getAllJobs = async function (req, res) {
    try {
        let user = req.user;
        let jobs;
        // console.log(user);
        if (user.role == "Recruiter") {
            jobs = await jobModel.find({ postedBy: user["_id"] });
        } else {
            jobs = await jobModel.find({});
        }
        // console.log(jobs);
        res.json({ jobs });
    } catch (err) {
        res.json({ err });
    }
}

module.exports.deleteJob = async function (req, res) {
    try {
        let user = req.user;
        if (user.role == "Recruiter") {
            let { job_id } = req.params;
            // console.log(job_id);
            await jobModel.deleteOne({ _id: job_id });
            res.json({
                success : true
            })
        } else {
            res.json({
                message: "You are not authorized"
            })
        }
    } catch (err) {
        res.json({ err });
    }
}