import { all, call, put, takeLatest } from 'redux-saga/effects';

import { INITIAL_STATE } from '../../constants/authConstants';
import { successInitialState } from '../actions/initialStateActions';
import { me } from './authSaga';

/**
 * Loads data that should be ready before application is shown.
 */
export function* fetchInitialState() {
  try {
    yield call(me);
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
