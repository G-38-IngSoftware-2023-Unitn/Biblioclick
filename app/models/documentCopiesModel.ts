import mongoose, { Schema } from "mongoose";

export const documentCopySchema = new mongoose.Schema(
    {
        documentId: {
            type: Schema.Types.ObjectId,
            ref: "documents",
            required: true,
        },
        reservationStatus: {
            type: Boolean,
            required: true,
        },
        loanStatus: {
            type: Boolean,
            required: true,
        },
        isLoanable: {
            type: Boolean,
            required: true,
        }
        
    },
    {
        timestamps: true,
    }
);

// if the model is already defined, use that model else create a new one
export default mongoose.models["documentCopies"] || mongoose.model("documentCopies", documentCopySchema);