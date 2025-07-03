import Course from '../models/course.model.js';
import AppError from '../utils/error.utils.js';
import fs from 'fs';
import cloudinary from 'cloudinary';

const getAllCourses = async (req, res, next) => {
    try {
        const courses = await Course.find({}).select('-lectures');
        if (!courses || courses.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No courses found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Courses fetched successfully',
            courses,
        });
    } catch (error) {
        next(new AppError(error.message), 500);
    }
}

const getCourseById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Course fetched successfully',
            course,
        });
    } catch (error) {
        next(new AppError(error.message), 500);
    }
}

const createCourse = async (req, res, next) => {
    try {
        const { title, description, category, createdBy } = req.body;

        if (!title || !description || !category || !createdBy) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const course = await Course.create({
            title,
            description,
            category,
            createdBy,
            thumbnail: {
                public_id: '',
                secure_url: ''
            }
        });

        if (!course) {
            return res.status(500).json({
                success: false,
                message: 'Failed to create course'
            });
        }

        if (req.file) {
            try {
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: 'lms'
                })

                if (!result) {
                    return res.status(500).json({
                        success: false,
                        message: 'Failed to upload course image'
                    });
                }

                course.thumbnail.public_id = result.public_id;
                course.thumbnail.secure_url = result.secure_url;

                await course.save();

                fs.unlink(req.file.path, (err) => {
                    if (err) {
                        console.error('Failed to delete local file:', err);
                    }
                });
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: 'Failed to upload course image, Please try again!!!'
                });
            }
        }

        res.status(201).json({
            success: true,
            message: 'Course created successfully',
            course,
        });
    } catch (error) {
        next(new AppError(error.message), 500);
    }
}

const updateCourse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const course = await Course.findByIdAndUpdate(id, 
            { 
                $set: req.body
            }, 
            { 
                runValidators: true 
            }
        );
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }
        await res.status(200).json({
            success: true,
            message: 'Course updated successfully',
            course,
        });
    } catch (error) {
        next(new AppError(error.message), 500);
    }
}

const removeCourse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const course = await Course.findByIdAndDelete(id);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Course deleted successfully',
        });
    }
    catch (error) {
        next(new AppError(error.message), 500);
    }
}

export {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    removeCourse
};