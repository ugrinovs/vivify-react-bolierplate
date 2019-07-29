import { defineAction } from 'redux-define';

const REQUEST = 'REQUEST';
const ERROR = 'ERROR';
const SUCCESS = 'SUCCESS';
const CLEAR_ERRORS = 'CLEAR_ERRORS';
const AUTHORIZE = 'AUTHORIZE';

export const LOGIN_ACTION = defineAction('LOGIN_ACTION', [
  ERROR,
  CLEAR_ERRORS,
  REQUEST,
  SUCCESS,
  AUTHORIZE,
]);
export const REGISTER_ACTION = defineAction('REGISTER_ACTION', [
  ERROR,
  CLEAR_ERRORS,
  REQUEST,
  SUCCESS,
]);
export const INITIAL_STATE = defineAction('INITIAL_STATE', [REQUEST, SUCCESS]);

export const REQUEST_LOGOUT_ACTION = 'REQUEST_LOGOUT_ACTION';
export const LOGOUT_ACTION = 'LOGOUT_ACTION';

export const AUTH_STOP_FETCHING_ACTION = 'AUTH_STOP_FETCHING_ACTION';
