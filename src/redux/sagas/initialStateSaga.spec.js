import { testSaga } from 'redux-saga-test-plan';
import { LOGIN_ACTION } from '../../constants/authConstants';
import { successInitialState } from '../actions/initialStateActions';
import { fetchInitialState } from './initialStateSaga';

describe('InitialStateSaga', () => {
  describe('fetchInitialState', () => {
    it('should fetchInitialState', () => {
      testSaga(fetchInitialState)
        .next()
        .put({ type: LOGIN_ACTION.AUTHORIZE })
        .next()
        .put(successInitialState())
        .next()
        .isDone();
    });
  });
});
