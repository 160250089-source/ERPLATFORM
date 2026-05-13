import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

// ================= APPLY FOR A JOB =================

export const applyJob = async (req, res) => {
    try {
        // Logged in user id coming from auth middleware
        const userId = req.id;

        // Job id coming from route params
        const jobId = req.params.id;

        // Check if job id exists
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            })
        };

        // Check if user has already applied for this job
        const existingApplication = await Application.findOne({
            job: jobId,
            applicant: userId
        });

        // If application already exists then stop user
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this jobs",
                success: false
            });
        }

        // Find the job in database
        const job = await Job.findById(jobId);

        // If job does not exist
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }

        // Create new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });

        // Push application id into job applications array
        job.applications.push(newApplication._id);

        // Save updated job
        await job.save();

        // Success response
        return res.status(201).json({
            message: "Job applied successfully.",
            success: true
        })

    } catch (error) {
        console.log(error);
    }
};

// ================= GET ALL APPLIED JOBS OF USER =================

export const getAppliedJobs = async (req, res) => {
    try {

        // Logged in user id
        const userId = req.id;

        // Find all applications of current user
        const application = await Application.find({
            applicant: userId
        })
            // Sort applications by latest first
            .sort({ createdAt: -1 })

            // Populate job details
            .populate({
                path: 'job',
                options: { sort: { createdAt: -1 } },

                // Populate company details inside job
                populate: {
                    path: 'company',
                    options: { sort: { createdAt: -1 } },
                }
            });

        // If no applications found
        if (!application) {
            return res.status(404).json({
                message: "No Applications",
                success: false
            })
        };

        // Return all applications
        return res.status(200).json({
            application,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

// ================= GET ALL APPLICANTS FOR A PARTICULAR JOB =================
// Admin can see how many users applied for a job
export const getApplicants = async (req, res) => {
    try {

        // Get job id from params
        const jobId = req.params.id;

        // Find job and populate applications + applicant details
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },

            // Populate applicant data inside applications
            populate: {
                path: 'applicant'
            }
        });

        // If job not found
        if (!job) {
            return res.status(404).json({
                message: 'Job not found.',
                success: false
            })
        };

        // Add job info with every application
        const applications = job.applications.map((application) => ({
            ...application.toObject(),

            // Custom job object
            job: {
                _id: job._id,
                title: job.title,
                company: job.company,
            }
        }));

        // Return applications
        return res.status(200).json({
            applications,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}

// ================= GET ALL UNIQUE APPLICANTS FOR ADMIN =================
export const getAdminApplicants = async (req, res) => {
    try {

        // Logged in admin id
        const adminId = req.id;

        // Find all jobs created by admin
        const jobs = await Job.find({
            created_by: adminId
        }).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },

            // Populate applicant details
            populate: {
                path: 'applicant'
            }
        });

        // Convert jobs data into applications array
        const applications = jobs.flatMap((job) =>
            (job.applications || []).map((application) => ({
                ...application.toObject(),

                // Attach job info
                job: {
                    _id: job._id,
                    title: job.title,
                    company: job.company,
                }
            }))
        );

        // Array for storing unique applicants
        const uniqueApplications = [];

        // Set to track already added applicants
        const seenApplicants = new Set();

        // Loop through applications
        for (const application of applications) {

            // Convert applicant id into string safely
            const applicantId =
                application.applicant?._id?.toString?.() ||
                application.applicant?.toString?.() ||
                application._id.toString();

            // Check if applicant already exists
            if (!seenApplicants.has(applicantId)) {

                // Add applicant id to set
                seenApplicants.add(applicantId);

                // Push unique application
                uniqueApplications.push(application);
            }
        }

        // Return unique applications
        return res.status(200).json({
            applications: uniqueApplications,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}

// ================= UPDATE APPLICATION STATUS =================
export const updateStatus = async (req, res) => {
    try {

        // Get status from request body
        const { status } = req.body;

        // Get application id from params
        const applicationId = req.params.id;

        // Check if status exists
        if (!status) {
            return res.status(400).json({
                message: 'status is required',
                success: false
            })
        };

        // Find application using application id
        const application = await Application.findOne({
            _id: applicationId
        });

        // If application not found
        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false
            })
        };

        // Update application status
        application.status = status.toLowerCase();

        // Save updated application
        await application.save();

        // Success response
        return res.status(200).json({
            message: "Status updated successfully.",
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}