import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Config } from "../config/env";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.get("Authorization");
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    try {
        const tokenValue = token.startsWith("Bearer ") ? token.split(" ")[1] : token;

        const decoded = jwt.verify(tokenValue, Config.JWT_SECRET as string);
        //@ts-ignore
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
};

export { authMiddleware };