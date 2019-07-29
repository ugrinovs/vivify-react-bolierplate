import createReducer from '../createReducer';

import {
  AUTH_STOP_FETCHING_ACTION,
  LOGIN_ACTION,
  LOGOUT_ACTION,
} from '../../constants/authConstants';

const initialState = {
  isFetching: false,
  authenticated: false,
  errors: null,
};

export default createReducer(
  {
    [LOGIN_ACTION.REQUEST]: userLoginRequest,
    [LOGIN_ACTION.SUCCESS]: userLogin,
    [LOGIN_ACTION.ERROR]: updateErrors,
    [LOGOUT_ACTION]: userLogout,
    [LOGIN_ACTION.CLEAR_ERRORS]: clearErrors,
    [AUTH_STOP_FETCHING_ACTION]: stopFetching,
  },
  initialState
);

function userLoginRequest(state) {
  return {
    ...state,
    isFetching: true,
  };
}

function userLogin(state) {
  return {
    ...state,
    errors: '',
    isFetching: false,
    authenticated: true,
  };
}

function updateErrors(state, { payload }) {
  return {
    ...state,
    isFetching: false,
    errors: payload,
  };
}

function userLogout(state) {
  return {
    ...state,
    errors: '',
    authenticated: false,
  };
}

function clearErrors(state) {
  return {
    ...state,
    errors: '',
  };
}

function stopFetching(state) {
  return {
    ...state,
    isFetching: false,
  };
}
