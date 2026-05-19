import express from "express";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
import { authMiddleware } from "../middleware/auth.middleware";
import { createComplaint, getAllComplaints, updateComplaintStatus } from "../controllers/complaint.controller";
import roleMiddleware from "../middleware/role.middleware";
import { ROLES } from "../constants";
import { createDepartment, getDepartments, getDepartmentComplaints } from "../controllers/department.controller";

const router = express.Router();

router.use(authMiddleware);

router.get(
    "/",
    getDepartments
);

router.post(
    "/",
    roleMiddleware(
        ROLES.ADMIN,
        ROLES.SUPER_ADMIN
    ),
    createDepartment
);

router.get(
    "/:departmentId/complaints",
    roleMiddleware(
        ROLES.DEPARTMENT_OFFICER,
        ROLES.ADMIN
    ),
    getDepartmentComplaints
);

router.patch(
    "/complaints/:id/status",
    roleMiddleware(
        ROLES.DEPARTMENT_OFFICER,
        ROLES.ADMIN
    ),
    updateComplaintStatus
);

export { router as departmentRoutes };