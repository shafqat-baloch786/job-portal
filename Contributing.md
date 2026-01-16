# Contributing to Job Portal

Thank you for your interest in contributing to **Job Portal**! 🙌
This project is open-source and welcomes contributions of all kinds — code, bug fixes, documentation, or feature requests.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [How to Contribute](#how-to-contribute)
3. [Creating Issues](#creating-issues)
4. [Code Guidelines](#code-guidelines)
5. [Pull Requests](#pull-requests)
6. [Community & Support](#community--support)

---

## Getting Started

To contribute, you need Node.js, npm, and a local copy of the project:

```bash
# Clone your fork of the repository
git clone https://github.com/shafqat-baloch786/job-portal.git
cd job-portal

# Install dependencies
npm install
cp .env.example .env   # create your own .env file with dummy credentials first
npm run dev            # start server at http://localhost:8000
```

Make sure the project runs correctly locally before submitting any changes.

---

## How to Contribute

1. **Fork the repository**
2. **Create a new branch** for your work:

   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes (bug fix, new feature, documentation update)
4. **Commit your changes** with clear messages:

   ```bash
   git add .
   git commit -m "feat(job): add job search filter"
   ```
5. **Push your branch** to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request** to the main repository, describing what you changed and why.

---

## Creating Issues

Before working on a feature or bug:

* Check if a similar issue already exists.
* If not, create a new issue with:

  * **Title**: Short and descriptive
  * **Description**: Explain the problem or feature in detail
  * **Labels**: `bug`, `enhancement`, `good first issue`, `help wanted`

---

## Code Guidelines

* Follow the **existing code style** (Node.js, Express, JavaScript, EJS, Bootstrap).
* Keep **commit messages concise and descriptive**.
* Test your changes locally to ensure nothing breaks.
* Avoid pushing secrets or `.env` files — use `.env.example`.
* Keep your code modular and readable — refactor for clarity if necessary.

---

## Pull Requests

* Reference the issue you are solving, e.g., `Closes #12`.
* Provide screenshots or GIFs if updating UI components.
* Ensure your PR **only contains related changes**.
* Wait for a review — maintainers may request changes before merging.
* Be respectful and respond to review comments thoughtfully.

---

## Community & Support

* Be respectful and patient in all interactions.
* Ask questions in issues if you are unsure.
* Contributions of all skill levels are welcome!

---

Thank you for helping improve **Job Portal**! 💻✨
