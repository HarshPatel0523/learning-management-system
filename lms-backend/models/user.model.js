import bcrypt from 'bcryptjs';
import { Schema, model } from "mongoose";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true,'Full name is required'],
        minLength: [5, 'Full name must be at least 5 characters long'],
        maxLength: [50, 'Full name must be at most 50 characters long'],
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true,'Email is required'],
        lowercase: true,
        trim: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password must be at least 8 characters long'],
        select: false, // Do not return password in queries
    },
    avatar: {
        publicId : {
            type: String,
            required: [true, 'Avatar public ID is required'],
        },
        secureUrl: {
            type: String,
            required: [true, 'Avatar secure URL is required'],
        },
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER',
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
}, {
    timestamps: true,
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods = {
    generateJWT: async function() {
        return await jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
    },
    comparePassword: function(plainTextPassword) {
        return bcrypt.compare(plainTextPassword, this.password)
    },
    generateForgotPasswordToken: function() {
        const resetToken = crypto.randomBytes(32).toString('hex');

        this.forgotPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        this.forgotPasswordExpiry = Date.now() + 30 * 60 * 1000;

        return resetToken;
    }
}

const User = model("User", userSchema);

export default User;