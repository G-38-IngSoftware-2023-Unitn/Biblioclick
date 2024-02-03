import mongoose from "mongoose";

export const loanSchema = new mongoose.Schema(
    {
        documentCopyId: {
            type: String,
            required: true,
        },
        userId:{
            type: String,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// if the model is already defined, use that model else create a new one
export default mongoose.models["loans"] || mongoose.model("loans", loanSchema);