import express from "express";
import cookie_parser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connect_db from "./utils/db.js";
import user_route from "./routes/users.js";
import company_route from "./routes/company.js";
import job_route from "./routes/jobs.js";
import application_route from "./routes/applications.js";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
// import {ejs} from 'ejs';
import ejs from "ejs";


// Define __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure dotenv
dotenv.config({});

// Initialize Express app
const app = express();

// Define paths for views and public files
const views_path = path.join(__dirname, "views");
const public_files_path = path.join(__dirname, "public");

// Serve static files
app.use(express.static(public_files_path));

// Set up EJS as the template engine
app.set("view engine", "ejs");
app.set("views", views_path);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie_parser());

// CORS configuration
const cors_options = {
    origin: "http://localhost:5173",
    credentials: true
};
app.use(cors(cors_options));

// Define port
const PORT = 8000;

// Routes
app.use("/", user_route);
app.use("/", job_route);

// API routes
app.use("/api/v1/user", user_route);
app.use("/api/v1/company", company_route);
app.use("/api/v1/job", job_route);
app.use("/api/v1/application", application_route);

// Start the server
app.listen(PORT, () => {
    connect_db();
    console.log(`Server running at port ${PORT}`);
});
