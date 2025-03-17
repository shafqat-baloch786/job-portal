// Importing dependencies
import { Company } from "../models/company.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// Registering a company
export const register_company = async (request, response) => {
    try {
        const { company_name } = request.body;

        if (!company_name) {
            return response.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }

        let company = await Company.findOne({ name: company_name });

        if (company) {
            return response.status(400).json({
                message: "You can't register the same company.",
                success: false
            });
        }

        company = await Company.create({
            name: company_name,
            user_id: request.id
        });

        return response.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            message: "An error occurred while registering the company.",
            success: false
        });
    }
};

// Getting companies by user
export const get_company = async (request, response) => {
    try {
        const user_id = request.id; // logged-in user id
        const companies = await Company.find({ user_id });

        if (!companies || companies.length === 0) {
            return response.status(404).json({
                message: "No companies found.",
                success: false
            });
        }

        return response.status(200).json({
            companies,
            success: true
        });
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            message: "An error occurred while fetching companies.",
            success: false
        });
    }
};

// Getting a company by ID
export const get_company_by_id = async (request, response) => {
    try {
        const company_id = request.params.id;
        const company = await Company.findById(company_id);

        if (!company) {
            return response.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        return response.status(200).json({
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            message: "An error occurred while fetching the company.",
            success: false
        });
    }
};

// Updating a company
export const update_company = async (request, response) => {
    try {
        const { name, description, website, location } = request.body;
        const file = request.file;

        if (!file) {
            return response.status(400).json({
                message: "Logo file is required.",
                success: false
            });
        }

        const file_uri = getDataUri(file);
        const cloud_response = await cloudinary.uploader.upload(file_uri.content);
        const logo = cloud_response.secure_url;

        const update_data = { name, description, website, location, logo };

        const company = await Company.findByIdAndUpdate(request.params.id, update_data, { new: true });

        if (!company) {
            return response.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        return response.status(200).json({
            message: "Company information updated successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            message: "An error occurred while updating the company.",
            success: false
        });
    }
};
