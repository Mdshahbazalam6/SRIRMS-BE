import express from "express";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
import { authMiddleware } from "../middleware/auth.middleware";
import { assignDepartmentToComplaint, createComplaint, getAllComplaints, updateComplaintStatus } from "../controllers/complaint.controller";
import roleMiddleware from "../middleware/role.middleware";
import { ROLES } from "../constants";

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    roleMiddleware(ROLES.USER),
    upload.single("image"),
    createComplaint
);

router.get(
    "/",
    authMiddleware,
    roleMiddleware(ROLES.USER),
    getAllComplaints
);

router.patch(
    "/:id/status",
    authMiddleware,
    updateComplaintStatus
);

router.patch(
    "/department/assign/:departmentId/:complaintId",
    authMiddleware,
    assignDepartmentToComplaint
);

export { router as complaintRoutes };