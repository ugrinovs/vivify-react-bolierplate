import { all, takeLatest, put } from 'redux-saga/effects';

import { INITIAL_STATE, LOGIN_ACTION } from '../../constants/authConstants';
import { successInitialState } from '../actions/initialStateActions';

/**
 * Loads data that should be ready before application is shown.
 */
export function* fetchInitialState() {
	try {
		yield put({type: LOGIN_ACTION.AUTHORIZE});
		yield put(successInitialState());
	} catch (e) {
		yield put(INITIAL_STATE.ERROR, e);
	}
}

export default function* initialStateSaga() {
	return yield all([
		yield takeLatest(INITIAL_STATE.REQUEST, fetchInitialState),
	]);
}
