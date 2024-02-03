import mongoose from "mongoose";

export const reservationSchema = new mongoose.Schema(
    {
        documentCopyId: {
            type: String,
            required: true,
        },
        userId:{
            type: String,
            required: true,
        },
        reservationStatus: {
            type: Boolean,
            required: true,
        },
        
        
    },
    {
        timestamps: true,
    }
);

// if the model is already defined, use that model else create a new one
export default mongoose.models["reservations"] || mongoose.model("reservations", reservationSchema);