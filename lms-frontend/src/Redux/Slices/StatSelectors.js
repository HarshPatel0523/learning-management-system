import { createSelector } from '@reduxjs/toolkit';

// Memoized selector for stats
export const selectStats = createSelector(
  state => state.stat,
  stat => stat || { allUsersCount: 0, subscribedCount: 0 }
);
