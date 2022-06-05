import { createSlice } from '@reduxjs/toolkit';
import { getLessonsFirebaseApi, getLessonsMongoApi } from '../../api/getLessons';

export const REDUCER_NAME = 'lessons';

const initialState = {
  items: [],
  bookedItems: [],
  loading: false,
  error: null,
  isReady: false,
};

export const lessonsSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    setLessons: (state, { payload }) => {
      state.items = payload.sort((a, b) => a.level - b.level);
      state.bookedItems = payload.filter((lesson) => lesson.booked);
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    setIsDataReady: (state) => {
      state.isReady = true;
    },
  },
});

export const { setLessons, setLoading, setError, setIsDataReady } = lessonsSlice.actions;

export const fetchLessonsAsync = () => async (dispatch, getState) => {
  dispatch(setLoading(true));

  try {
    // const lessons = await getLessonsFirebaseApi();
    const lessons = await getLessonsMongoApi();
    dispatch(setLessons(lessons));
    dispatch(setIsDataReady());
    dispatch(setError(null));
  } catch (e) {
    console.log(e.message);
    dispatch(setError(e.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const selectLessons = (state) => state[REDUCER_NAME].items;
export const selectLessonById = (id) => (state) =>
  state[REDUCER_NAME].items.find((item) => item.id === id);
export const selectLoading = (state) => state[REDUCER_NAME].loading;
export const selectError = (state) => state[REDUCER_NAME].error;
export const selectIsDataReady = (state) => state[REDUCER_NAME].isReady;

export default lessonsSlice.reducer;
