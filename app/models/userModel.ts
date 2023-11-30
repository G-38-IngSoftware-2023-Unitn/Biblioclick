import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        surname:{
            type: String,
            required: true
        },
        codiceFiscale:{
            type: String,
            required: true
        },
        dateOfBirth:{
            type: Date,
            required: true
        },
        cityOfBirth:{
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        isVerified: {
            type: Boolean,
            default: false,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: false,
            required: true,
        }

    },
    {
        timestamps: true,
    }
);

// if the model is already defined, use that model else create a new one
export default mongoose.models["users"] || mongoose.model("users", userSchema);