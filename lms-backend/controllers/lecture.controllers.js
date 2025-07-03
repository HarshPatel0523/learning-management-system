import Course from '../models/course.model.js';
import AppError from '../utils/error.utils.js';
import cloudinary from 'cloudinary';
import fs from 'fs';

const addLectureToCourseById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        const lectureData = {
            title,
            description,
            lecture: {
                public_id: '',
                secure_url: ''
            }
        }

        if (req.file) {
            try {
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: 'lms'
                });

                if (!result) {
                    return res.status(500).json({
                        success: false,
                        message: 'Failed to upload lecture video'
                    });
                }

                lectureData.lecture.public_id = result.public_id;
                lectureData.lecture.secure_url = result.secure_url;

                fs.unlink(req.file.path, (err) => {
                    if (err) {
                        console.error('Failed to delete local file:', err);
                    }
                });
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: 'Failed to upload lecture thumbnail, Please try again!!!'
                });
            }
        }

        course.lectures.push(lectureData);

        course.numberOfLectures = course.lectures.length;

        await course.save();

        res.status(201).json({
            success: true,
            message: 'Lecture added successfully',
            course
        });
    } catch (error) {
        next(new AppError(error.message), 500);
    }
}

const getAllLecturesByCourseId = async (req, res, next) => {
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
            lectures: course.lectures
        });
    } catch (error) {
        next(new AppError(error.message), 500);
    }
}

const getLectureById = async (req, res, next) => {
    try {
        const { id, lectureId } = req.params;

        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        const lecture = course.lectures.find(lecture => lecture._id.toString() === lectureId);

        if (!lecture) {
            return res.status(404).json({
                success: false,
                message: 'Lecture not found'
            });
        }

        res.status(200).json({
            success: true,
            lecture
        });
    } catch (error) {
        next(new AppError(error.message), 500);
    }
}

const removeLectureFromCourseById = async (req, res, next) => {
    try {
        const { id, lectureId } = req.params;

        if (!lectureId) {
            return res.status(400).json({
                success: false,
                message: 'Lecture ID is required'
            });
        }

        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        const lectureIndex = course.lectures.findIndex(lecture => lecture._id.toString() === lectureId);

        if (lectureIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Lecture not found'
            });
        }

        course.lectures.splice(lectureIndex, 1);
        course.numberOfLectures = course.lectures.length;

        await course.save();

        res.status(200).json({
            success: true,
            message: 'Lecture removed successfully',
            course
        });
    } catch (error) {
        next(new AppError(error.message), 500);
    }
}

export {
    addLectureToCourseById,
    removeLectureFromCourseById,
    getAllLecturesByCourseId,
    getLectureById
};