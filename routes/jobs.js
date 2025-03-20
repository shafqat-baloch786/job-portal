import express from "express";
import is_authenticated from "../middlewares/is_authenticated.js";
import { get_admin_jobs, get_all_jobs, get_job_by_id, post_job, edit_job } from "../controllers/jobs.js";
import {delete_item} from "../middlewares/delete.js";

const router = express.Router();

router.route("/post")
    .post(is_authenticated, post_job)
    .get(is_authenticated, post_job);

router.route("/jobs").get(is_authenticated, get_all_jobs);

router.route("/get").get(is_authenticated, get_all_jobs);
router.route("/getadminjobs").get(is_authenticated, get_admin_jobs);
router.route("/get/:id").get(is_authenticated, get_job_by_id);

// Edit jobs
router.route('/edit-job/:id').get(is_authenticated, edit_job).post(is_authenticated, edit_job);

// Delete route
router.route("/job/:item_id").delete(is_authenticated, delete_item);

export default router;