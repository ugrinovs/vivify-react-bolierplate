import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
	LOGIN_ACTION,
	REQUEST_LOGOUT_ACTION
} from '../../constants/authConstants';
import authService from '../../services/api/authService';
import request from '../../services/request';
import { logout } from '../actions/authActions';
import {extractFirstErrorEachField} from '../../utils/errors';

export function* logIn({ payload }) {
	try {
		const response = yield call(authService.logIn, {
			email: payload.email,
			password: payload.password,
		});

		const {data} = response;
		if (data) {
			request.setAuthToken(data.token);

			yield put({type: LOGIN_ACTION, payload: data});
		}
	} catch (e) {
		const {data, statusText} = e.response;
		if (!data && statusText) {
			return yield put({type: LOGIN_ACTION.ERROR, payload: statusText});
		}

		const errors = data.errors || data.error;
		if (errors) {
			const payload = extractFirstErrorEachField(errors);
			return yield put({type: LOGIN_ACTION.ERROR, payload});
		}

		return yield put({type: LOGIN_ACTION.ERROR, payload: null});
	}
}

export function* logOut() {
	request.removeToken();
	yield put(logout());
}

export default function* authSaga() {
	return yield all([
		yield takeLatest(LOGIN_ACTION.REQUEST, logIn),
		yield takeLatest(REQUEST_LOGOUT_ACTION, logOut)
	]);
}
