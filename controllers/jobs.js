import { Job } from "../models/jobs.js";
// import cookies from 'js-cookie';
import { User } from "../models/users.js";
// const cookies = require('js-cookie');

export const post_job = async (req, res) => {
    try {
        const current_url = req.orignalUrl;
        if(req.method === "GET") {
            res.render('post_job', {title: "Post a job", current_url});
        } else {
        const { title, description, salary, location, jobType, experience, position, companyId } = await req.body;
        console.log(title, description, salary, location, jobType, experience, position);
        const userId = req.id;
        const current_cookie = req.cookies.token;
    
        // console.log("Payload", current_cookie.payload);
        // console.log("Cookie", current_cookie);
        const email = await req.email;
        
        const current_user = await User.findOne({email});
        console.log("Current_user", current_user);
        const user_name = current_user.fullname;

        console.log("User_name", user_name);
        // if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position) {
        //     return res.status(400).json({
        //         message: "Something is missing.",
        //         success: false
        //     });
        // };
        const job = await Job.create({
            title,
            description,
            salary,
            location,
            job_type: jobType,
            experience_level: experience,
            position,
            company: current_user.profile.company,
            created_by: user_name,
            user_id: current_user._id,
        });
        job.save();
        return res.status(201).redirect('/jobs');
       
    }
    } catch (error) {
        console.log("An error", error);
    }
}

// Getting all jobs on user side
export const get_all_jobs = async (req, res) => {
    try {

        // My code
        const all_jobs = await Job.find();
        // console.log(all_jobs.title);
        if(req.method === "GET") {
            res.render('jobs', {title: 'Jobs', all_jobs});
        }

        // My code ending

    } catch (error) {
        console.log("Error in jobs page", error);
    }
}


// Getting job for student
export const get_job_by_id = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}


// Jobs posted by admin/recruiter
export const get_admin_jobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
