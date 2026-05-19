import { Request, Response } from "express";
import Complaint from "../models/complaints.models";
import { STATUS } from "../constants";

export const assignComplaint = async (req: Request, res: Response) => {
    try {
        const { departmentId } = req.body;

        const complaint = await Complaint.findByIdAndUpdate(
            req.params.id,
            {
                departmentId: departmentId,
                createdAt: new Date(),
                status: STATUS.ASSIGNED,
            },
            {
                new: true,
            }
        );

        return res.status(200).json({
            message: "Complaint assigned successfully",
            complaint,
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const updateComplaintStatus = async (req: Request, res: Response) => {
    try {
        const { status } = req.body;

        const updateData: any = {
            status,
        };

        if (status === STATUS.RESOLVED) {
            updateData.resolvedAt = new Date();
        }

        const complaint =
            await Complaint.findByIdAndUpdate(
                req.params.id,
                {
                    ...updateData,
                },
                {
                    new: true,
                }
            );

        return res.json(complaint);
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const total =
            await Complaint.countDocuments();

        const pending =
            await Complaint.countDocuments({
                status: STATUS.PENDING,
            });

        const resolved =
            await Complaint.countDocuments({
                status: STATUS.RESOLVED,
            });

        const inProgress =
            await Complaint.countDocuments({
                status: STATUS.IN_PROGRESS,
            });

        return res.json({
            total,
            pending,
            resolved,
            inProgress,
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const getAllComplaints = async (req: Request, res: Response) => {
    try {
        const result = await Complaint.find().populate({
            path: 'feedBackId',
        }).populate("userId").populate('departmentId').lean();

        return res.json(result);
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
        });
    }
}