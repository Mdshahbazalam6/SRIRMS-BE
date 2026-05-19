import mongoose from "mongoose";
import { CATEGORY, STATUS } from "../constants";

const complaintSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        title: String,

        description: String,

        category: {
            type: String,
            enum: [...Object.values(CATEGORY)]
        },

        imageUrl: String,

        location: {
            latitude: Number,
            longitude: Number
        },

        status: {
            type: String,
            enum: [...Object.values(STATUS)],
            default: STATUS.PENDING
        },

        priorityScore: {
            type: Number,
            default: 0
        },

        departmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department"
        },
        feedbackSubmitted: {
            type: Boolean,
            default: false
        },
        feedBackId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Feedback",
            unique: true,
        },
        createdAt: Date,
        resolvedAt: Date,
    },
    {
        timestamps: true
    }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;