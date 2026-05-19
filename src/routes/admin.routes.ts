import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import roleMiddleware from "../middleware/role.middleware";
import * as controller from "../controllers/admin.controller";
import { getDashboardStats, updateComplaintStatus } from "../controllers/admin.controller";
import { ROLES } from "../constants";

const router = express.Router();

router.route("/complaints").get(
    authMiddleware,
    roleMiddleware(
        ROLES.ADMIN,
        ROLES.SUPER_ADMIN
    ),
    controller.getAllComplaints);

router.route("/assign/:id").patch(
    authMiddleware,
    roleMiddleware(
        ROLES.ADMIN,
        ROLES.SUPER_ADMIN
    ),
    controller.assignComplaint
);

router.route("/status/:id").patch(
    authMiddleware,
    roleMiddleware(
        ROLES.ADMIN,
        ROLES.SUPER_ADMIN
    ),
    updateComplaintStatus
);

router.route("/dashboard").get(
    authMiddleware,
    roleMiddleware(
        ROLES.ADMIN,
        ROLES.SUPER_ADMIN
    ),
    getDashboardStats
);

export { router as adminRoutes };