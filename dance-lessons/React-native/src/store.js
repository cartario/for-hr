import { configureStore } from '@reduxjs/toolkit';
import lessonsReducer, { REDUCER_NAME as lessons } from './screens/Lessons/lessonsSlice';
import userReducer, { REDUCER_NAME as user } from './screens/User/userSlice';

export default configureStore({
  reducer: {
    [lessons]: lessonsReducer,
    [user]: userReducer,
  },
});
