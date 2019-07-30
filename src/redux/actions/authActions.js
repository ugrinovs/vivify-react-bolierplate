import {
  LOGIN_ACTION,
  LOGOUT_ACTION,
  REGISTER_ACTION,
  REQUEST_LOGOUT_ACTION,
} from '../../constants/authConstants';

export function requestLogIn(payload) {
  return {
    type: LOGIN_ACTION.REQUEST,
    payload,
  };
}

export function authenticateUser() {
  return {
    type: LOGIN_ACTION.SUCCESS,
  };
}

export function requestLogOut() {
  return {
    type: REQUEST_LOGOUT_ACTION,
  };
}

export function logout() {
  return {
    type: LOGOUT_ACTION,
  };
}

export function requestRegister(payload) {
  return {
    type: REGISTER_ACTION.REQUEST,
    payload,
  };
}

export function clearErrors() {
  return {
    type: LOGIN_ACTION.CLEAR_ERRORS,
  };
}
