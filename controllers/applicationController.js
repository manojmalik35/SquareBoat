const userModel = require("../models/userModel");
const jobModel = require("../models/jobModel");

module.exports.createApplication = async function (req, res) {
    try {

        let { job_id } = req.body;
        let user = req.user;
        let user_id = user["_id"];
        let job = await jobModel.findById(job_id);
        if(user.role == "Recruiter"){
            return res.json({
                success : false,
                message : "You cannot apply. You are a recruiter"
            })
        }
        
        if(job.isOpen == false){
            return res.json({
                success : false,
                message : "This job is no longer available"
            })
        }

        let jobs = user.appliedJobs;
        jobs.push(job_id);
        await userModel.findByIdAndUpdate(user_id, { appliedJobs: jobs });
        console.log("alfjladskjfladskjflkadsj");
        
        jobs = job.appliedBy;
        jobs.push(user_id);
        await jobModel.findByIdAndUpdate(job_id, { appliedBy: jobs });

        res.json({
            success : true
        });

    } catch (err) {
        res.json({ err })
    }
}

module.exports.viewAppliedByCandidates = async function(req, res){
    let user = req.user;
    if(user.role == "Candidate"){
        return res.json({
            success : false,
            message : "You are not authorized"
        })
    }

    let job_id = req.params.job_id;
    let job = await jobModel.findById(job_id);
    if(job.postedBy != user["_id"]){
        return res.json({
            success: false,
            message : "Something went wrong"
        })
    }

    res.json({
        success : true,
        users : job.appliedBy
    })
}