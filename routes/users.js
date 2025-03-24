import express from "express";
import { login, logout, recruiter_registration, update_profile, main_page, my_profile, applicant_registration } from "../controllers/users.js";
import is_authenticated from "../middlewares/is_authenticated.js";
import single_upload from "../middlewares/multer.js";
import { get_all_jobs } from "../controllers/jobs.js";

const router = express.Router();

// Main page
router.route("/").get(get_all_jobs);

// Register page
router.route('/register').get(main_page);
// Profile page
router.route("/profile").get(is_authenticated, my_profile);

// Recruiter registration
router.route("/recruiter-registration")
    .post(single_upload, recruiter_registration)
    .get(recruiter_registration);
router.route('/applicant-registration').get(applicant_registration).post(single_upload, applicant_registration);
// Login
router.route("/login").get(login).post(login);

// Logout
router.route("/logout").get(logout);

// Update profile
router.route("/profile/recruiter-edit").get(is_authenticated, update_profile).post(is_authenticated, single_upload, update_profile);

export default router;