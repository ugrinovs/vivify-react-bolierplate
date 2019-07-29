import reducer from './authReducer';
import {
  AUTH_STOP_FETCHING_ACTION,
  LOGIN_ACTION,
  LOGOUT_ACTION,
} from '../../constants/authConstants';

const initialStateMock = {
  isFetching: false,
  authenticated: false,
  errors: null,
};

describe('AuthReducer', () => {
  it('should return initial state', () => {
    const initialState = reducer(undefined, {});
    expect(initialState).toEqual(initialStateMock);
  });

  it('should request login', () => {
    const nextState = reducer(initialStateMock, {
      type: LOGIN_ACTION.REQUEST,
    });
    expect(nextState).toEqual({ ...initialStateMock, isFetching: true });
  });

  it('should login', () => {
    const nextState = reducer(initialStateMock, {
      type: LOGIN_ACTION.SUCCESS,
    });
    expect(nextState).toEqual({
      ...initialStateMock,
      isFetching: false,
      authenticated: true,
      errors: '',
    });
  });

  it('should update errors', () => {
    const nextState = reducer(initialStateMock, {
      type: LOGIN_ACTION.ERROR,
      payload: 'Error',
    });
    expect(nextState).toEqual({ ...initialStateMock, errors: 'Error' });
  });

  it('should logout user', () => {
    const nextState = reducer(initialStateMock, { type: LOGOUT_ACTION });
    expect(nextState).toEqual({
      ...initialStateMock,
      errors: '',
      authenticated: false,
    });
  });

  it('should clear errors', () => {
    const prevState = reducer(initialStateMock, {
      type: LOGIN_ACTION.ERROR,
      payload: 'Error',
    });
    expect(prevState).toEqual({ ...initialStateMock, errors: 'Error' });

    const nextState = reducer(prevState, {
      type: LOGIN_ACTION.CLEAR_ERRORS,
    });
    expect(nextState).toEqual({ ...initialStateMock, errors: '' });
  });

  it('should stop fetching', () => {
    const prevState = reducer({ ...initialStateMock, isFetching: true }, {});
    const nextState = reducer(prevState, {
      type: AUTH_STOP_FETCHING_ACTION,
    });

    expect(nextState).toEqual({ ...initialStateMock, isFetching: false });
  });
});
