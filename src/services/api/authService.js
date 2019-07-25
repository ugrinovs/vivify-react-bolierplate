import request from '../request';

const endpoints = {
	login: '/auth/login',
	register: '/auth/register',
	me: '/auth/me',
	logout: '/auth/logout',
	refresh: '/auth/refresh',
};

const logIn = (credentials) => request.post(endpoints.login, credentials);

const register = (data) => request.post(endpoints.register, data);

const me = (token) => request.get(endpoints.me, {
	headers: {
		'Authorization': `Bearer ${token}`
	}
});

export default {
	logIn,
	register,
	me,
};
