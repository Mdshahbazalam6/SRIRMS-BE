import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import roleMiddleware from "../middleware/role.middleware";
import * as Controller from "../controllers/analytics.controller"
import { ROLES } from "../constants";

const router = express.Router();

router.use(authMiddleware);

router.use(
    roleMiddleware(
        ROLES.ADMIN,
        ROLES.SUPER_ADMIN
    )
);

router.get(
    "/dashboard",
    Controller.getDashboardAnalytics
);

router.get(
    "/categories",
    Controller.getCategoryAnalytics
);

router.get(
    "/monthly-trends",
    Controller.getMonthlyTrends
);

router.get(
    "/feedback",
    Controller.getFeedbackAnalytics
);

export { router as analyticsRoutes };