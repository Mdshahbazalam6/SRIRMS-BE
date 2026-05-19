import dotenv from "dotenv";
dotenv.config();

export const Config = {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGODB: {
        USERNAME: process.env.USERNAME,
        PASSWORD: process.env.PASSWORD,
    },
    CLOUDINARY: {
        CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        API_KEY: process.env.CLOUDINARY_API_KEY,
        API_SECRET: process.env.CLOUDINARY_API_SECRET,
    }
}