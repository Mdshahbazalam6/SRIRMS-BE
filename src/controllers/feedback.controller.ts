import { Request, Response } from "express";
import Feedback from "../models/Feedback.model";
import Complaint from "../models/complaints.models";

export const submitFeedback = async (req: any, res: Response) => {
    try {
        const { rating, comment } =
            req.body;

        const complaint =
            await Complaint.findById(
                req.params.complaintId
            );

        if (!complaint) {
            return res
                .status(404)
                .json({
                    message:
                        "Complaint not found",
                });
        }

        // Only complaint owner can give feedback
        if (complaint.userId && complaint.userId.toString() !== req.user.id) {
            return res
                .status(403)
                .json({
                    message:
                        "Unauthorized",
                });
        }

        // Feedback allowed only after resolution

        const statuses = Array.isArray(complaint.status)
            ? complaint.status
            : [complaint.status];

        if (
            !statuses.some(
                (status) =>
                    status === "RESOLVED" ||
                    status === "REJECTED"
            )
        ) {
            return res
                .status(400)
                .json({
                    message:
                        "Feedback allowed only for resolved/rejected complaints",
                });
        }

        // Prevent duplicate feedback

        const existingFeedback =
            await Feedback.findOne({
                complaintId:
                    complaint._id,
            });

        if (existingFeedback) {
            return res
                .status(400)
                .json({
                    message:
                        "Feedback already submitted",
                });
        }

        const feedback =
            await Feedback.create({
                complaintId:
                    complaint._id,

                userId:
                    req.user.id,

                rating,

                comment,
            });

        complaint.feedbackSubmitted = true;
        complaint.feedBackId = feedback._id;

        await complaint.save();

        return res.status(201).json({
            message:
                "Feedback submitted successfully",

            feedback,
        });
    } catch (error: any) {
        return res
            .status(500)
            .json({
                message:
                    error.message,
            });
    }
};

export const getAllFeedbacks = async (req: Request, res: Response) => {
    try {
        const feedbacks =
            await Feedback.find()
                .populate(
                    "userId",
                    "name email"
                )
                .populate(
                    "complaintId",
                    "title category"
                )
                .sort({
                    createdAt: -1,
                });

        return res.json(
            feedbacks
        );
    } catch (error: any) {
        return res
            .status(500)
            .json({
                message:
                    error.message,
            });
    }
};