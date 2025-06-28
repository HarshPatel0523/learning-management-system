import AppError from "../utils/error.utils.js";
import User from "../models/user.model.js";
import cloudinary from "cloudinary"
import fs from "fs";
import sendEmail from "../utils/sendEmail.utils.js";
import crypto from "crypto";

const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true
}

const register = async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return next(new AppError("Please provide all required fields", 400));
        }

        const isUserExists = await User.findOne({ email });

        if (isUserExists) {
            return next(new AppError("Email already exists", 400));
        }

        const user = await User.create({
            fullName,
            email,
            password,
            avatar: {
                publicId: "default_avatar",
                secureUrl: "https://res.cloudinary.com/default_avatar.png"
            }
        });

        if (!user) {
            return next(new AppError("User registration failed, Please try again!!!", 500));
        }

        console.log(JSON.stringify(req.file));

        if (req.file) {
            try {
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: "lms",
                    width: 150,
                    height: 150,
                    gravity: "faces",
                    crop: "fill",
                })

                if (result) {
                    user.avatar.publicId = result.public_id;
                    user.avatar.secureUrl = result.secure_url;
                }

                // Remove the file from local storage after uploading to cloud
                fs.unlink(req.file.path, (err) => {
                    if (err) {
                        console.error("Failed to delete local file:", err);
                    }
                });
            }
            catch (error) {
                return next(new AppError("Failed to upload avatar, Please try again!!!", 500));
            };
        }

        await user.save();

        user.password = undefined; // Do not return password in response

        const token = await user.generateJWT();

        res.cookie('token', token, cookieOptions)

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        });
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return next(new AppError("All fields are required", 400))
        }

        const user = await User.findOne({
            email
        }).select("+password")

        if (!user || !(await user.comparePassword(password))) {
            return next(new AppError('Email or Password doesn\'t match', 400))
        }

        const token = await user.generateJWT();
        user.password = undefined;

        res.cookie('token', token, cookieOptions)

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user
        });
    }
    catch (error) {
        return next(new AppError(error.message, 500));
    }
}

const logout = async (req, res) => {
    try {
        res.cookie('token', null, {
            secure: true,
            maxAge: 0,
            httpOnly: true
        })

        res.status(200).json({
            success: true,
            message: "User Logged Out Successfully"
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getProfile = async (req, res, next) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId)

        res.status(200).json({
            success: true,
            message: 'User Details',
            user
        })
    } catch (error) {
        return next(new AppError('Failed to fetch profile'))
    }
}

const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return next(new AppError("Email is required", 400));
        }

        const user = await User.findOne({ email });

        if (!user) {
            return next(new AppError("User with this email does not exist", 404));
        }

        const resetToken = user.generateForgotPasswordToken();

        await user.save();

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        try {
            await sendEmail({
                email: user.email,
                subject: "Password Reset Request",
                message: `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`
            });

            res.status(200).json({
                success: true,
                message: `Email sent to ${user.email} with password reset instructions`
            });
        } catch (error) {
            user.forgotPasswordToken = undefined;
            user.forgotPasswordExpiry = undefined;
            await user.save();
            return next(new AppError("Failed to send reset password email", 500));
        }
    }
    catch (error) {
        return next(new AppError('Failed to process forgot password request, ' + error.message, 500));
    }
}

const resetPassword = async (req, res, next) => {
    try {
        const { resetToken } = req.params;
        const { password } = req.body;

        if (!resetToken || !password) {
            return next(new AppError("Reset token and new password are required", 400));
        }

        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        const user = await User.findOne({
            forgotPasswordToken: hashedToken,
            forgotPasswordExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return next(new AppError("Invalid or expired reset token", 400));
        }

        user.password = password;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpiry = undefined;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password has been reset successfully"
        });
    }
    catch (error) {
        return next(new AppError('Failed to process reset password request, ' + error.message, 500));
    }
}

const changePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return next(new AppError("All fields are mandatory ", 400));
        }

        const user = await User.findById(req.user.id).select("+password");

        if (!user) {
            return next(new AppError("User does not exist", 400));
        }

        const isPasswordMatch = await user.comparePassword(oldPassword);

        if (!isPasswordMatch) {
            return next(new AppError("Old password is incorrect", 400));
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });
    } catch (error) {
        return next(new AppError('Failed to change password, ' + error.message, 500));
    }
}

const updateUser = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { fullName } = req.body;

        if (!fullName) {
            return next(new AppError("Full name is required", 400));
        }

        const user = await User.findById(userId);

        if (!user) {
            return next(new AppError("User not found", 404));
        }

        user.fullName = fullName;

        if (req.file) {
            await cloudinary.v2.uploader.destroy(user.avatar.publicId);
            try {
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: "lms",
                    width: 150,
                    height: 150,
                    gravity: "faces",
                    crop: "fill",
                });

                if (result) {
                    user.avatar.publicId = result.public_id;
                    user.avatar.secureUrl = result.secure_url;
                }

                fs.unlink(req.file.path, (err) => {
                    if (err) {
                        console.error("Failed to delete local file:", err);
                    }
                });
            } catch (error) {
                return next(new AppError("Failed to upload avatar, Please try again!!!", 500));
            }
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "User details updated successfully",
            user
        });
    } catch (error) {
        return next(new AppError('Failed to update user, ' + error.message, 500));
    }
};

export { register, login, logout, getProfile, forgotPassword, resetPassword, changePassword, updateUser };