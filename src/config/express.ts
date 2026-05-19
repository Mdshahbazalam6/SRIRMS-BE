import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
// import { getAllImagesFromCloudinary } from "../utils/cloudinary.methods";
import { Logger } from "../common/logger";
import { routes } from "../routes";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});
// app.get('/check', async (req: Request, res: Response) => {
//     try {

//         const images = await getAllImagesFromCloudinary();
//         if (!images) {
//             res.status(404).json({ message: 'No images found' })
//         }

//         res.status(200).json(images);
//     } catch (error: any) {
//         Logger.error(`Error getting images from cloudinary ${error.message}`)
//     }
// })


app.use('/v1', routes);

app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    console.log(err);
    Logger.error(`Unhandled error: ${err.message}`);
    res.status(500).json({ message: "Internal server error" });
});

export default app;