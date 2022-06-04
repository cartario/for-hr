import baseReducer from '/somewhere';
import { ProgramNames, GoalNamesMap } from './const';

const pupilGradeGoals = Object.keys(GoalNamesMap).map((key) => ({
  goal: key,
  condition: '',
}));

export const initialState = {
  filter: {
    subject: '',
    klass: '',
  },
  subjects: Object.keys(ProgramNames),
  pupilGradeGoals,
  isValid: false,
  alert: {
    errors: null,
    success: null,
  },
  initProgram: null,
  program: null,
  touchedModulesIdx: [],
  touchedIdx: {
    pupilDiagnostics: [],
  },
  fetching: false,
};

const reducer = {
  ...baseReducer,
  SET_VALID(state, payload) {
    return {
      ...state,
      isValid: payload,
    };
  },
  SET_FILTER(state, payload) {
    return {
      ...state,
      filter: {
        ...state.filter,
        ...payload,
      },
    };
  },
  SET_PROGRAM(state, payload) {
    return {
      ...state,
      program: payload,
    };
  },

  SET_FETCHING(state, payload) {
    return {
      ...state,
      fetching: payload,
    };
  },

  SET_ALERT(state, payload) {
    return {
      ...state,
      alert: {
        ...state.alert,
        ...payload,
      },
    };
  },

  SET_DIAGNOSTICS(state, { value, sectionIndex }) {
    const updatedSection = state.program.pupilDiagnostics[sectionIndex];
    updatedSection.result = value;

    const updatedPupilDiagnostics = [
      ...state.program.pupilDiagnostics.slice(0, sectionIndex),
      updatedSection,
      ...state.program.pupilDiagnostics.slice(sectionIndex + 1),
    ];

    const touchedIdx = {
      ...state.touchedIdx,
      pupilDiagnostics: state.touchedIdx.pupilDiagnostics.includes(sectionIndex)
        ? state.touchedIdx.pupilDiagnostics
        : [...state.touchedIdx.pupilDiagnostics, sectionIndex],
    };

    return {
      ...state,
      program: {
        ...state.program,
        pupilDiagnostics: updatedPupilDiagnostics,
      },
      touchedIdx,
    };
  },
  SET_EXAMS(state, dateId) {
    return {
      ...state,
      program: {
        ...state.program,
        pupilExamDateId: dateId,
      },
    };
  },
};

export default (state = {}, { type, payload }) => (reducer[type] || (() => state))(state, payload);
