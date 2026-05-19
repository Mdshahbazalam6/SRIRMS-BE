import { Request, Response } from "express";
import Complaint from "../models/complaints.models";
import { cloudinary } from "../config/cloudinary";
import mongoose from "mongoose";
import fs from 'fs/promises';

export const createComplaint = async (req: any, res: Response) => {
    try {
        const {
            title,
            description,
            category,
            latitude,
            longitude
        } = req.body;

        let cloudinaryResult: any;

        try {
            // 1. Upload to Cloudinary
            cloudinaryResult = await cloudinary.uploader.upload(req.file.path);

            await fs.unlink(req.file.path);

        } catch (error) {
            console.error("Cloudinary Upload Error:", error);

            try {
                await fs.unlink(req.file.path);
                console.log("Local file cleaned up after failed upload attempt.");
            } catch (unlinkError) {
                console.error("Failed to delete local file during error cleanup:", unlinkError);
            }

            return res.status(500).json({ message: "Failed to upload image to Cloudinary" });
        }

        const complaint = await Complaint.create({
            userId: req.user.id,
            title,
            description,
            category,
            imageUrl: cloudinaryResult.url || null,
            location: {
                latitude,
                longitude
            },
            priorityScore: 5
        });

        return res.status(201).json({
            message: "Complaint submitted",
            complaint
        });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({
            message: error.message
        });
    }
};

export const getAllComplaints = async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const complaints = await Complaint.find({ userId: req.user.id })
            .populate("userId")

            .sort({ createdAt: -1 });
        return res.status(200).json(complaints);
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const updateComplaintStatus = async (req: Request, res: Response) => {
    try {
        const { status } = req.body;

        const complaint = await Complaint.findByIdAndUpdate(
            req.params.id,
            {
                status
            },
            {
                new: true
            }
        );

        return res.status(200).json(complaint);
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({
            message: error.message
        });
    }
};

export const assignDepartmentToComplaint = async (req: Request, res: Response) => {
    try {
        const { departmentId, complaintId }: any = req.params;

        const data = await Complaint.findById(new mongoose.Types.ObjectId(complaintId.trim()))
        const complaint = await Complaint.findByIdAndUpdate(
            new mongoose.Types.ObjectId(complaintId.trim()),
            { departmentId: new mongoose.Types.ObjectId(departmentId.trim()) },
            { new: true }
        );

        return res.status(200).json(complaint);
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({
            message: error.message
        });
    }
};