import { Request, Response } from "express";
import Complaint from "../models/complaints.models";
import Feedback from "../models/Feedback.model";
import { STATUS } from "../constants";

export const getDashboardAnalytics = async (req: Request, res: Response) => {
    try {
        const totalComplaints =
            await Complaint.countDocuments();

        const pendingComplaints =
            await Complaint.countDocuments({
                status: STATUS.PENDING,
            });

        const assignedComplaints =
            await Complaint.countDocuments({
                status: STATUS.ASSIGNED,
            });

        const resolvedComplaints =
            await Complaint.countDocuments({
                status: STATUS.RESOLVED,
            });

        const rejectedComplaints =
            await Complaint.countDocuments({
                status: STATUS.REJECTED,
            });

        const inProgressComplaints =
            await Complaint.countDocuments({
                status: STATUS.IN_PROGRESS,
            });

        return res.json({
            totalComplaints,
            pendingComplaints,
            resolvedComplaints,
            inProgressComplaints,
            assignedComplaints,
            rejectedComplaints
        });
    } catch (error: any) {
        return res.status(500).json({
            message:
                error.message,
        });
    }
};

export const getCategoryAnalytics = async (req: Request, res: Response) => {
    try {
        const categories =
            await Complaint.aggregate([
                {
                    $group: {
                        _id: "$category",

                        count: {
                            $sum: 1,
                        },
                    },
                },
            ]);

        return res.json(
            categories
        );
    } catch (error: any) {
        return res.status(500).json({
            message:
                error.message,
        });
    }
};

export const getMonthlyTrends = async (req: Request, res: Response) => {
    try {
        const monthlyData =
            await Complaint.aggregate([
                {
                    $group: {
                        _id: {
                            month: {
                                $month:
                                    "$createdAt",
                            },

                            year: {
                                $year:
                                    "$createdAt",
                            },
                        },

                        total: {
                            $sum: 1,
                        },
                    },
                },

                {
                    $sort: {
                        "_id.year": 1,
                        "_id.month": 1,
                    },
                },
            ]);

        return res.json(
            monthlyData
        );
    } catch (error: any) {
        return res.status(500).json({
            message:
                error.message,
        });
    }
};

export const getFeedbackAnalytics = async (req: Request, res: Response) => {
    try {
        const averageRating =
            await Feedback.aggregate([
                {
                    $group: {
                        _id: null,

                        avgRating: {
                            $avg:
                                "$rating",
                        },
                    },
                },
            ]);

        const ratingDistribution =
            await Feedback.aggregate([
                {
                    $group: {
                        _id: "$rating",

                        total: {
                            $sum: 1,
                        },
                    },
                },
            ]);

        return res.json({
            averageRating,

            ratingDistribution,
        });
    } catch (error: any) {
        return res.status(500).json({
            message:
                error.message,
        });
    }
};