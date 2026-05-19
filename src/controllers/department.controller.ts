import Department from "../models/department.models";
import Complaint from "../models/complaints.models";
import { Request, Response } from "express";

export const createDepartment = async (req: Request, res: Response) => {
    try {
        const { departmentName } = req.body;

        const departmentExists = await Department.findOne({ departmentName })
        if (departmentExists) {
            return res.status(400).json({ message: 'Department already exist with this name' })
        }

        const department = await Department.create({ departmentName });

        return res.status(201).json({
            message:
                "Department created successfully",

            department,
        });
    } catch (error: any) {
        return res.status(500).json({
            message:
                error.message,
        });
    }
};

export const getDepartments = async (req: Request, res: Response) => {
    try {
        const departments =
            await Department.find();

        return res.json(
            departments
        );
    } catch (error: any) {
        return res.status(500).json({
            message:
                error.message,
        });
    }
};

export const getDepartmentComplaints = async (req: Request, res: Response) => {
    try {
        const complaints =
            await Complaint.find({
                assignedDepartment:
                    req.params.departmentId,
            })
                .populate(
                    "userId",
                    "name"
                )
                .sort({
                    createdAt: -1,
                });

        return res.json(
            complaints
        );
    } catch (error: any) {
        return res.status(500).json({
            message:
                error.message,
        });
    }
};

// export const updateComplaintStatus= async (req: Request, res: Response) => {
//     try {
//       const { status } = req.body;

//       const complaint =
//         await Complaint.findByIdAndUpdate(
//           req.params.id,
//           {
//             status,

//             $push: {
//               statusHistory: {
//                 status,

//                 updatedBy:
//                   req.user.id,
//               },
//             },

//             ...(status ===
//               "RESOLVED" && {
//               resolvedAt:
//                 new Date(),
//             }),
//           },
//           {
//             new: true,
//           }
//         );

//       return res.json({
//         message:
//           "Status updated successfully",

//         complaint,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         message:
//           error.message,
//       });
//     }
//   };