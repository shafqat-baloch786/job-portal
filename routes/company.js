import express from "express";
import is_authenticated from "../middlewares/is_authenticated.js";
import { get_company, get_company_by_id, register_company, update_company } from "../controllers/company.js";
import single_upload from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(is_authenticated, register_company);
router.route("/get").get(is_authenticated, get_company);
router.route("/get/:id").get(is_authenticated, get_company_by_id);
router.route("/update/:id").put(is_authenticated, single_upload, update_company);

export default router;