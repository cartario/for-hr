import { createSlice } from '@reduxjs/toolkit';

export const REDUCER_NAME = 'user';

const initialState = {
  isAuth: false,
  loading: false,
  error: null,
  totalScore: 359,
  level: 1,
  lessons: [],
};

export const userSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    setUser: (state, { payload }) => {},
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { setUser, setLoading, setError } = userSlice.actions;

export const fetchUserAsync = () => async (dispatch, getState) => {
  dispatch(setLoading(true));
  try {
    //api
    dispatch(setUser());
    dispatch(setError(null));
  } catch (e) {
    console.log(e.message);
    dispatch(setError(e.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const selectUser = (state) => state[REDUCER_NAME];

export default userSlice.reducer;
