import mongoose from "mongoose";

const user_schema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone_number: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'recruiter'],
        required: true
    },
    profile: {
        bio: { type: String },
        skills: [{ type: String }],
        company: { type: String },
        profile_photo: {
            type: String,
            default: ""
        }
    }
}, { timestamps: true });

export const User = mongoose.model('User', user_schema);