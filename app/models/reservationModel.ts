import mongoose, { Schema } from "mongoose";

export const reservationSchema = new mongoose.Schema(
    {
        documentCopyId: {
            type: Schema.Types.ObjectId,
            ref: "documentCopies",
            required: true,
        },
        userId:{
            type: Schema.Types.ObjectId,
            ref: "users",
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
export default mongoose.models["reservations"] || mongoose.model("reservations", reservationSchema);