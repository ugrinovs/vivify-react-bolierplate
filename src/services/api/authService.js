import request from '../request';

const logIn = credentials => request.post('/login', credentials);

export default {
	logIn
};
