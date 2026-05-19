import mongoose from "mongoose";
import { REGEX } from "../constants/Regex";
import bcrypt from "bcryptjs";
import { v1 as uuidv1 } from 'uuid';

const adminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: (value: string) => REGEX.email.test(value),
            message: 'Please enter a valid email address'
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (value: string) => REGEX.password.test(value),
            message: 'Please enter a valid password'
        }
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user'],
        default: 'user',
    },
    mobile: {
        type: String,
        required: true,
        validate: {
            validator: (value: string) => REGEX.mobile.test(value),
            message: 'Please enter a valid mobile number'
        }
    },
    uuid: {
        type: String,
    }
},
    {
        timestamps: true,
    }
);

adminSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    if (this.isNew) {
        this.uuid = uuidv1();
    }
});

export default mongoose.model('Admin', adminSchema);
