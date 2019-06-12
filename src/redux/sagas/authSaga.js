import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
	LOGIN_ACTION,
	LOGIN_ERROR_ACTION,
	REQUEST_LOGIN_ACTION,
	REQUEST_LOGOUT_ACTION
} from '../../constants/authConstants';
import authService from '../../services/api/authService';
import request from '../../services/request';
import { logout } from '../actions/authActions';

export function* logIn({ payload }) {
	try {
		const response = yield call(authService.logIn, {
			email: payload.email,
			password: payload.password
		});

		const { data } = response;
		if (data) {
			request.setAuthToken(data.token);

			yield put({ type: LOGIN_ACTION, payload: data });
		}
	} catch (e) {
		const { errors, email, password } = e.response.data;
		if (errors) {
			yield put({ type: LOGIN_ERROR_ACTION, payload: errors.detail });
		}

		if (email) {
			yield put({ type: LOGIN_ERROR_ACTION, payload: email[0] });
		}

		if (password) {
			yield put({ type: LOGIN_ERROR_ACTION, payload: password[0] });
		}
	}
}

export function* logOut() {
	request.removeToken();
	yield put(logout());
}

export default function* authSaga() {
	return yield all([
		yield takeLatest(REQUEST_LOGIN_ACTION, logIn),
		yield takeLatest(REQUEST_LOGOUT_ACTION, logOut)
	]);
}
