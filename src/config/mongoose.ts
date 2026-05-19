import mongoose from "mongoose";
import { Logger } from "../common/logger";
import { Config } from "./env";

export const connectToDB = () => {

    try {
        const MONGODB_URI = `mongodb+srv://${Config.MONGODB.USERNAME}:${Config.MONGODB.PASSWORD}@cluster0.k4xu2.mongodb.net/SRIRMS`;

        mongoose.connect(MONGODB_URI, {
            appName: 'SRIRMS'
        });
        return mongoose.connection;
    } catch (error: any) {
        console.error(`Failed to connect to MongoDB: ${error}`);
        Logger.error(`[database]: Failed to connect to MongoDB: ${error.message}`)
        process.exit(-1);
    }
}