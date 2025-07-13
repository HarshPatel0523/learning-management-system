import { createSelector } from '@reduxjs/toolkit';

// Memoized selector for courses
export const selectCourses = createSelector(
  state => state.courses.courseData,
  courseData => courseData
);
