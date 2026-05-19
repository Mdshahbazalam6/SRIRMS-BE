import { Request, Response } from "express";
import User from "../models/user.models";
import bcrypt from "bcryptjs";

import generateToken from "../utils/generateToken";

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = generateToken(user);

        return res.status(201).json({
            user,
            token
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password, role } = req.body;

        const user = await User.findOne({ email, role });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const token = generateToken(user);

        return res.status(200).json({
            user,
            token
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const createFirstregister = async () => {
    try {
        const body = { name: "Shahbaz Admin", email: 'shahbaz@admin.com', password: 'Test@123', role: 'ADMIN' };

        const existingUser = await User.findOne({ email: body.email });

        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const user = await User.create({
            name: body.name,
            email: body.email,
            password: hashedPassword,
            role: body.role as "ADMIN" | "USER"
        });

        // const token = generateToken(user);

        // return res.status(201).json({
        //     user,
        //     token
        // });
    } catch (error: any) {
        // return res.status(500).json({
        //     message: error.message
        // });
        console.log(error);
    }
};