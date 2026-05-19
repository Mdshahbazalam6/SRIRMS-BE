import express from 'express';
// import { userRoutes } from './admin.routes';
import { authRoutes } from './auth.routes';
import { complaintRoutes } from './complaint.routes';
import { adminRoutes } from './admin.routes';
import { FeedbackRoutes } from './feedback.routes';
import { analyticsRoutes } from "./analytics.routes";
import { departmentRoutes } from './department.routes';


const Router = express.Router();

Router.use("/auth", authRoutes)
Router.use("/complaints", complaintRoutes)
Router.use("/admin", adminRoutes)
Router.use("/feedback", FeedbackRoutes)
Router.use("/analytics", analyticsRoutes);
Router.use("/departments", departmentRoutes);


export { Router as routes }