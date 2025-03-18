


// Profile images setting

import multer from "multer";
import path from "path";
import fs from "fs";

// Disk storage configuration for saving files to the server
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(process.cwd(), "public/profile images");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); 
    },
});

const single_upload = multer({ storage }).single("profilePhoto");
export default single_upload;



