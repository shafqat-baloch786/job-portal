// Applications
import { Application } from "../models/applications.js";
import { Job } from "../models/jobs.js";

// Appliying on jobs
export const apply_job = async (request, response) => {
    try {
        const user_id = request.id;
        const job_id = request.params.id;

        if (!job_id) {
            return response.status(400).json({
                message: "Job ID is required to apply.",
                success: false
            });
        }

        const existing_application = await Application.findOne({ job: job_id, applicant: user_id });

        if (existing_application) {
            return response.status(400).json({
                message: "You have already applied for this job.",
                success: false
            });
        }

        const job = await Job.findById(job_id);
        if (!job) {
            return response.status(404).json({
                message: "The job you are trying to apply for does not exist.",
                success: false
            });
        }

        const new_application = await Application.create({
            job: job_id,
            applicant: user_id,
        });

        job.applications.push(new_application._id);
        await job.save();

        return response.status(201).json({
            message: "Job application submitted successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            message: "An error occurred while processing your application.",
            success: false
        });
    }
};

// Getting applied jobs
export const get_applied_jobs = async (request, response) => {
    try {
        const user_id = request.id;
        const applications = await Application.find({ applicant: user_id })
            .sort({ created_at: -1 })
            .populate({
                path: 'job',
                options: { sort: { created_at: -1 } },
                populate: {
                    path: 'company',
                    options: { sort: { created_at: -1 } },
                }
            });

        if (!applications || applications.length === 0) {
            return response.status(404).json({
                message: "No job applications found.",
                success: false
            });
        }

        return response.status(200).json({
            applications,
            success: true
        });
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            message: "An error occurred while fetching your applications.",
            success: false
        });
    }
};

// Getting applicants
export const get_applicants = async (request, response) => {
    try {
        const job_id = request.params.id;
        const job = await Job.findById(job_id).populate({
            path: 'applications',
            options: { sort: { created_at: -1 } },
            populate: {
                path: 'applicant'
            }
        });

        if (!job) {
            return response.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        return response.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            message: "An error occurred while fetching applicants.",
            success: false
        });
    }
};

// Updating status
export const update_status = async (request, response) => {
    try {
        const { status } = request.body;
        const application_id = request.params.id;

        if (!status) {
            return response.status(400).json({
                message: "Status is required to update the application.",
                success: false
            });
        }

        const application = await Application.findOne({ _id: application_id });
        if (!application) {
            return response.status(404).json({
                message: "Application not found.",
                success: false
            });
        }

        application.status = status.toLowerCase();
        await application.save();

        return response.status(200).json({
            message: "Application status updated successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            message: "An error occurred while updating the application status.",
            success: false
        });
    }
};
