import { savePupilProgramApi } from './api';
import { adaptSendingData } from './utils';

export const setFetching = (fetching) => ({
  type: 'SET_FETCHING',
  payload: fetching,
});

export const setAlert = (payload) => ({
  type: 'SET_ALERT',
  payload,
});
export const setFilter = (payload) => ({
  type: 'SET_FILTER',
  payload,
});

export const checkValidation = () => (dispatch, getState) => {
  const { program } = getState();
  const initProgram = JSON.parse(getState().initProgram);
  const isValid = checkValid({ program, initProgram });

  dispatch({
    type: 'SET_VALID',
    payload: isValid,
  });
};

export const savePupilProgramAsync = (userId) => async (dispatch, getState) => {
  const { program, touchedIdx } = getState();
  const initProgram = JSON.parse(getState().initProgram);
  const { touchedModulesIdx } = getState();
  dispatch(setFetching(true));
  const { subject, klass } = getState().filter;

  try {
    await savePupilProgramApi({
      userId,
      subject,
      data: adaptSendingData({
        userId,
        program,
        initProgram,
        touchedModulesIdx,
        touchedIdx,
        pupilKlass: klass,
      }),
      pupilKlass: klass,
    });
    dispatch(loadProgramAsync(userId));
    dispatch(setAlert({ success: 'Изменения сохранены' }));
  } catch (e) {
    dispatch(setAlert({ errors: 'Что-то пошло не так!' }));
    console.error(e);
  } finally {
    dispatch(setFetching(false));
  }
};
