import { v2 as cloudinary } from 'cloudinary';
import { Config } from './env';

cloudinary.config({
    cloud_name: Config.CLOUDINARY.CLOUD_NAME,
    api_key: Config.CLOUDINARY.API_KEY,
    api_secret: Config.CLOUDINARY.API_SECRET,
});

export { cloudinary }
