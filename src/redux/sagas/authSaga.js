import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
	LOGIN_ACTION,
	REQUEST_LOGOUT_ACTION,
	REGISTER_ACTION,
} from '../../constants/authConstants';
import authService from '../../services/api/authService';
import request from '../../services/request';
import { authenticateUser, logout } from '../actions/authActions';
import { extractFirstErrorEachField } from '../../utils/errors';
import history from '../history';

export function* logIn({ payload }) {
	try {
		const response = yield call(authService.logIn, {
			email: payload.email,
			password: payload.password,
		});

		const { data } = response;
		if (data) {
			yield put(authenticateUser());
		}
	} catch (e) {
		const { data, statusText } = e.response;
		if (!data && statusText) {
			return yield put({ type: LOGIN_ACTION.ERROR, payload: statusText });
		}

		const errors = data.errors || data.error;
		if (errors) {
			const payload = extractFirstErrorEachField(errors);
			return yield put({ type: LOGIN_ACTION.ERROR, payload });
		}

		return yield put({ type: LOGIN_ACTION.ERROR, payload: null });
	}
}

export function* me() {
	try {
		yield call(authService.me);
		yield put(authenticateUser());
	} catch (e) {
		yield put({ type: LOGIN_ACTION.ERROR, payload: e });
	}
}

export function* logOut() {
	try {
		yield call(authService.logout);
		yield put(logout());
	} catch (e) {
		yield put({ type: LOGIN_ACTION.ERROR, payload: e });
	}
}

export function* register({ payload }) {
	yield call(authService.register, payload);
	yield call(history.push, '/');
}

export default function* authSaga() {
	return yield all([
		yield takeLatest(LOGIN_ACTION.REQUEST, logIn),
		yield takeLatest(LOGIN_ACTION.AUTHORIZE, me),
		yield takeLatest(REQUEST_LOGOUT_ACTION, logOut),
		yield takeLatest(REGISTER_ACTION.REQUEST, register),
	]);
}
