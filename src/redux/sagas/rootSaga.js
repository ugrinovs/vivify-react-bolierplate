import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import initialStateSaga from './initialStateSaga';

export default function* rootSaga() {
  yield all([authSaga(), initialStateSaga()]);
}
