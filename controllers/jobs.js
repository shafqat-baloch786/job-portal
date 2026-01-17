import { Job } from "../models/jobs.js";
import { User } from "../models/users.js";

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
        const email = await req.email;
        
        const current_user = await User.findOne({email});
        console.log("Current_user", current_user);
        const user_name = current_user.fullname;

        console.log("User_name", user_name);
   
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
        return res.status(201).redirect('/profile');
       
    }
    } catch (error) {
        console.log("An error", error);
    }
}

// Getting all jobs on user side
export const get_all_jobs = async (req, res) => {
    try {

        const all_jobs = await Job.find();
        if(req.method === "GET") {
            res.render('jobs', {title: 'Jobs', all_jobs});
        }

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


// Edit job

export const edit_job = async (request, response) => {
    try {
        const job_id = request.params.id;
        const current_url = request.orignalUrl;
        const existing_data =  await Job.findByIdAndUpdate(job_id);
        console.log("Job: ", existing_data);
        console.log("Job ID: ", job_id);
        if(request.method === "GET") {
            response.render('edit_job', {
                current_url,
                existing_data,
            });
        } else {
            const updated_data = await request.body;
            existing_data.title = updated_data.title,
            existing_data.description = updated_data.description,
            existing_data.salary = updated_data.salary,
            existing_data.experience_level = updated_data.experience,
            existing_data.location = updated_data.location,
            existing_data.job_type = updated_data.jobType,
            existing_data.position = updated_data.position,
            // existing_data.company = updated_data.company

            await existing_data.save();
            response.status(200).redirect('/profile');
        }
    } catch(error) {
        console.log("Error on edit page!", error);
    }
}