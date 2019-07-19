import request from '../request';

const endpoints = {
	login: '/auth/login',
	register: '/auth/register'
};

const logIn = credentials => request.post(endpoints.login, credentials);

export default {
	logIn
};
