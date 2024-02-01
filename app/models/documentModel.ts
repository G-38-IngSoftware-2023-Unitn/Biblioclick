import mongoose from "mongoose";

export const documentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        ISBN: {
            type: Number,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        publication_date: {
            type: Date,
            required: false,
        },
        genre: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: false,
        },
        publisher: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true,
    }
);

documentSchema.index({title: 'text', author: 'text', genre: 'text', publisher: 'text', description: 'text'});

// if the model is already defined, use that model else create a new one
export default mongoose.models["documents"] || mongoose.model("documents", documentSchema);