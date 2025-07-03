import { Router } from 'express';
import { createCourse, getAllCourses, getCourseById, removeCourse, updateCourse } from '../controllers/course.controllers.js';
import { authorizeRoles, isLoggedIn } from '../middlewares/auth.middlewares.js';
import upload from '../middlewares/multer.middlewares.js';
import { addLectureToCourseById, getAllLecturesByCourseId, getLectureById, removeLectureFromCourseById } from '../controllers/lecture.controllers.js';

const router = Router();

router.get('/',getAllCourses).post('/', isLoggedIn, authorizeRoles('ADMIN'), upload.single('thumbnail'), createCourse);

router.get('/:id', isLoggedIn, getCourseById).put('/:id', isLoggedIn, authorizeRoles('ADMIN'), updateCourse).delete('/:id', isLoggedIn, authorizeRoles('ADMIN'), removeCourse).post('/:id', isLoggedIn, authorizeRoles('ADMIN'), upload.single('lecture'), addLectureToCourseById)

router.get('/:id/lectures', isLoggedIn, getAllLecturesByCourseId)

router.get('/:id/lectures/:lectureId', isLoggedIn, getLectureById).delete('/:id/lectures/:lectureId', isLoggedIn, authorizeRoles('ADMIN'), removeLectureFromCourseById);

export default router;