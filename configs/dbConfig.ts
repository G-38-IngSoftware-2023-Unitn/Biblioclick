import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongo_url!);

        mongoose.connection.on('error', (err) => {
            console.error('Errore nella connessione al database:', err);
        });

        console.log("Mongo DB connected");

    } catch (error) {
        console.log(error);
    }
};
