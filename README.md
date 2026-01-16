
# Job Portal

A full-stack **Job Portal** application built with **Node.js**, **Express**, **MongoDB**, **EJS**, and **Bootstrap**. The platform allows recruiters to post jobs and manage applicants, and applicants to search and apply for jobs.

---

## Features

### For Applicants:
- Register and manage profile
- Browse available jobs
- Apply to jobs
- Track application status

### For Recruiters:
- Register and manage profile
- Register and manage company
- Post, edit, and delete jobs
- View applicants for each job
- Update application status

### General:
- Authentication with **JWT**
- File uploads for profile photos using **Multer**
- Cloudinary integration for company logos (optional)
- Fully responsive UI with **Bootstrap**
- Backend APIs for all major functionalities

---

## Project Structure

```
📁job-portal
 ├─ 📁controllers
 │   ├─ applications.js
 │   ├─ company.js
 │   ├─ job.js
 │   └─ users.js
 ├─ 📁models
 │   ├─ applications.js
 │   ├─ company.js
 │   ├─ jobs.js
 │   └─ users.js
 ├─ 📁routes
 │   ├─ applications.js
 │   ├─ company.js
 │   ├─ job.js
 │   └─ users.js
 ├─ 📁middlewares
 │   ├─ delete_item.js
 │   ├─ is_authenticated.js
 │   └─ multer.js
 ├─ 📁public
 │   ├─ css/
 │   └─ profile_images/
 ├─ 📁views
 │   ├─ EJS templates (Bootstrap-based UI)
 ├─ app.js
 └─ package.json
```

---

## Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Frontend:** EJS templates, Bootstrap 5
- **Authentication:** JWT tokens (stored in HTTP-only cookies)
- **File Uploads:** Multer for profile images, Cloudinary optional for logos
- **Other libraries:** bcryptjs, jsonwebtoken, cookie-parser

---

## .env Instructions

```env
# Local MongoDB connection (change 'Job_portal' to your database name)
# CONNECTION_STRING = mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/?retryWrites=true&w=majority
CONNECTION_STRING = mongodb+srv://<your_mongo_username>:<your_mongo_password>@cluster0.example.mongodb.net/Job_portal?retryWrites=true&w=majority

# Server configuration
PORT=8000
SECRET_KEY=<your_secret_key_here>

# Protocol and host for local development
PROTOCOL=http
HOST=localhost
```

---

## Installation

1. Clone the repo:

```bash
git clone https://github.com/shafqat-baloch786/job-portal.git
cd job-portal
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Visit `http://localhost:8000` in your browser

---

## Frontend

- Uses **EJS** templates
- Uses **Bootstrap 5** for styling
- Pages:
  - Login / Registration
  - Profile page
  - Job listing / Job post pages
  - Company management

---

## License
MIT License © 2026 Shafqat Baloch