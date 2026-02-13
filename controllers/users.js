// Importing dependencies
import { User } from "../models/users.js";
import { Job } from "../models/jobs.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = "89743229";

// Main page
export const main_page = async (request, response) => {
  try {
    response.render("main");
  } catch (error) {
    console.log("An error occurred in the main page:", error);
    return response.status(500).json({
      message: "An error occurred while loading the main page.",
      success: false,
    });
  }
};

// Recruiter registration
export const recruiter_registration = async (request, response) => {
  try {
    const current_url = request.originalUrl;
    if (request.method === "GET") {
      return response.render("recruiter_registration", { current_url });
    } else {
      const { fullname, email, phone_number, password, bio, company, skills } =
        request.body;
      if (!fullname || !email || !phone_number || !password) {
        return response.status(400).json({
          message: "Required fields are missing.",
          success: false,
        });
      }
      const file = request.file;
      let profile_photo = "";
      if (file) {
        profile_photo = "/profile_images/" + file.filename;
      }
      const user = await User.findOne({ email });
      if (user) {
        return response.status(400).json({
          message: "User already exists with this email.",
          success: false,
        });
      }
      const hashed_password = await bcrypt.hash(password, 10);
      const new_user = await User.create({
        fullname,
        email,
        phone_number,
        password: hashed_password,
        role: "recruiter",
        profile: {
          bio,
          company,
          skills,
          profile_photo,
        },
      });
      await new_user.save();
      const payload = { email: new_user.email, user_id: new_user._id };
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
      return response
        .status(200)
        .cookie("token", token, {
          maxAge: 1 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: "strict",
        })
        .redirect("/profile");
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: "An error occurred during registration.",
      success: false,
    });
  }
};

// Applicant registration
export const applicant_registration = async (request, response) => {
  try {
    const current_url = request.originalUrl;
    if (request.method === "GET") {
      return response.render("applicant_registration", { current_url });
    } else {
      const { fullname, email, phone_number, password, bio, skills } =
        request.body;
      if (!fullname || !email || !phone_number || !password) {
        return response.status(400).json({
          message: "Required fields are missing.",
          success: false,
        });
      }
      const file = request.file;
      let profile_photo = "";
      if (file) {
        profile_photo = "/profile_images/" + file.filename;
      }
      const user = await User.findOne({ email });
      if (user) {
        return response.status(400).json({
          message: "User already exists with this email.",
          success: false,
        });
      }
      const hashed_password = await bcrypt.hash(password, 10);
      const new_user = await User.create({
        fullname,
        email,
        phone_number,
        password: hashed_password,
        role: "applicant",
        profile: {
          bio,
          skills,
          profile_photo,
        },
      });
      await new_user.save();
      const payload = { email: new_user.email, user_id: new_user._id };
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
      return response
        .status(200)
        .cookie("token", token, {
          maxAge: 1 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: "strict",
        })
        .redirect("/profile");
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: "An error occurred during registration.",
      success: false,
    });
  }
};

// Login
export const login = async (request, response) => {
  try {
    if (request.method === "GET") {
      return response.render("login");
    }
    const { email, password, role } = request.body;
    if (!email || !password || !role) {
      return response.status(400).json({
        message: "Required fields are missing.",
        success: false,
      });
    }
    let current_user = await User.findOne({ email });
    console.log(current_user);
    if (!current_user) {
      return response.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    const is_password_match = await bcrypt.compare(
      password,
      current_user.password,
    );
    if (!is_password_match) {
      return response.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    if (role !== current_user.role) {
      return response.status(400).json({
        message: "Account does not exist with the selected role.",
        success: false,
      });
    }

    const payload = { email: current_user.email, user_id: current_user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
    return response
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .redirect("/profile");
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: "An error occurred during login.",
      success: false,
    });
  }
};

// Logout
export const logout = async (request, response) => {
  try {
    return response
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .redirect("/");
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: "An error occurred during logout.",
      success: false,
    });
  }
};

// Updating profile
export const update_profile = async (request, response) => {
  try {
    const current_url = request.originalUrl;
    const token = request.cookies.token;
    const decoded = jwt.verify(token, SECRET_KEY);
    const user_id = decoded.user_id;
    console.log("User id: ", user_id);
    console.log("User email: ", request.email);
    let user = await User.findByIdAndUpdate(user_id);
    console.log("User", user);
    let user_is;
    if (request.method === "GET") {
      response.render("recruiter_edit", {
        user,
        user_is,
        current_url,
      });
    } else {
      const { fullname, email, phone_number, bio, skills, company } =
        request.body;
      const file = request.file;

      if (!file) {
        return response.status(400).json({
          message: "Profile photo is required.",
          success: false,
        });
      }

      // const file = request.file;
      let profile_photo = "";
      if (file) {
        profile_photo = "/profile_images/" + file.filename;
      }

      let skills_array;
      if (skills) {
        skills_array = skills.split(",");
      }

      if (!user) {
        return response.status(404).json({
          message: "User not found.",
          success: false,
        });
      }

      if (fullname) user.fullname = fullname;
      if (email) user.email = email;
      if (phone_number) user.phone_number = phone_number;
      if (bio) user.profile.bio = bio;
      if (skills) user.profile.skills = skills_array;
      if (company) user.profile.company = company;
      await user.save();
      return response.status(200).redirect("/profile");
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: "An error occurred while updating the profile.",
      success: false,
    });
  }
};

// My profile
export const my_profile = async (request, response) => {
  try {
    const token = request.cookies.token;
    console.log("Token", token);
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Email", decoded.email);
    const my_email = request.email;
    const current_user = await User.findOne({ email: my_email });
    const role = current_user.role;
    const jobs = await Job.find({ user_id: current_user._id });

    const current_user_data = {
      name: current_user.fullname,
      email: current_user.email,
      phone: current_user.phone_number,
      profile: current_user.profile,
      company: current_user.company,
      role,
    };

    response.render("profile", { current_user_data, jobs });
  } catch (error) {
    console.log("An error occurred in the profile page:", error);
    return response.status(500).json({
      message: "An error occurred while loading the profile page.",
      success: false,
    });
  }
};
