import { createSelector } from '@reduxjs/toolkit';

// Memoized selector for lectures
export const selectLectures = createSelector(
  state => state.lecture?.lectures || [],
  lectures => lectures
);

// You can add more memoized selectors here as needed
