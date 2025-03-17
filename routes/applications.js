import express from "express";
import is_authenticated from "../middlewares/is_authenticated.js";
import { apply_job, get_applicants, get_applied_jobs, update_status } from "../controllers/applications.js";

const router = express.Router();

router.route("/apply/:id").get(is_authenticated, apply_job);
router.route("/get").get(is_authenticated, get_applied_jobs);
router.route("/:id/applicants").get(is_authenticated, get_applicants);
router.route("/status/:id/update").post(is_authenticated, update_status);

export default router;