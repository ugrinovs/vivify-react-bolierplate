import {
	AUTH_STOP_FETCHING_ACTION,
	CLEAR_LOGIN_ERRORS_ACTION,
	LOGIN_ACTION,
	LOGOUT_ACTION,
	REQUEST_LOGIN_ACTION,
	REQUEST_LOGOUT_ACTION
} from '../../constants/authConstants';

export function requestLogIn(payload) {
	return {
		type: REQUEST_LOGIN_ACTION,
		payload
	};
}

export function authenticateUser() {
	return {
		type: LOGIN_ACTION
	};
}

export function requestLogOut() {
	return {
		type: REQUEST_LOGOUT_ACTION
	};
}

export function logout() {
	return {
		type: LOGOUT_ACTION
	};
}

export function clearErrors() {
	return {
		type: CLEAR_LOGIN_ERRORS_ACTION
	};
}

export function authStopFetching() {
	return {
		type: AUTH_STOP_FETCHING_ACTION
	};
}
