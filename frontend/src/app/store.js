import { configureStore } from '@reduxjs/toolkit';
import poolReducer from '../features/pool-objects/poolObjectsReducer';

export const store = configureStore({
  reducer: {
    pool: poolReducer,
  },
});
