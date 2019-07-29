import { testSaga } from 'redux-saga-test-plan';
import sinon from 'sinon';

import history from '../history';
import authService from '../../services/api/authService';
import { logIn, logOut, me, register } from './authSaga';
import { authenticateUser, logout } from '../actions/authActions';
import { LOGIN_ACTION } from '../../constants/authConstants';
import request from '../../services/request';

describe('AuthSaga', () => {
	const email = 'test@test.com';
	const password = 'test1234';
	const payload = { email, password };

	const response = {
		data: {
			token: 'token',
		},
	};

	const getTokenStub = sinon.stub(request, 'getToken');

	describe('logIn', () => {
		it('should login', () => {
			const saga = testSaga(logIn, { payload })
				.next()
				.call(authService.logIn, payload);

			saga.next(response)
				.put(authenticateUser())
				.next()
				.isDone();
		});

		it('should throw error with statusText', () => {
			const e = {
				response: {
					statusText: 'Error',
				},
			};

			const saga = testSaga(logIn, { payload })
				.next()
				.call(authService.logIn, payload)
				.throw(e);

			saga.put({ type: LOGIN_ACTION.ERROR, payload: e.response.statusText })
				.next()
				.isDone();
			;
		});

		it('should throw error with data', () => {
			const e = {
				response: {
					data: { error: { email: ['Email error'], password: ['Password error'] } },
				},
			};

			const payload = { email: 'Email error', password: 'Password error' };

			const saga = testSaga(logIn, { payload })
				.next()
				.call(authService.logIn, payload)
				.throw(e);

			// const payload = extractFirstErrorEachField(e.response.data);

			saga.put({ type: LOGIN_ACTION.ERROR, payload })
				.next()
				.isDone();
		});
	});

	describe('me', () => {
		it('should authenticate user', () => {
			const token = 'token';
			getTokenStub
				.returns(token);

			const saga = testSaga(me)
				.next()
				.call(authService.me);

			saga.next()
				.put(authenticateUser())
				.next()
				.isDone();
		});

		it('should throw error when authenticating', () => {
			const token = 'token';
			const error = 'Unauthorized';

			getTokenStub.returns(token);

			const saga = testSaga(me)
				.next()
				.call(authService.me)
				.throw(error);

			saga.put({ type: LOGIN_ACTION.ERROR, payload: error })
				.next()
				.isDone();
		});
	});

	describe('logOut', () => {
		it('should logOut', () => {
			testSaga(logOut)
				.next()
				.call(authService.logout)
				.next()
				.put(logout())
				.next()
				.isDone();
		});
	});

	describe('register', () => {
		const data = {
			first_name: 'test',
			email: 'test@test.com',
			password: 'test1234'
		};

		it('should register', () => {
			testSaga(register, { payload: data })
				.next()
				.call(authService.register, data)
				.next()
				.call(history.push, '/')
				.next()
				.isDone();
		})
	})
});
