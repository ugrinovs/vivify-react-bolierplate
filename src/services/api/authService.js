import request from '../request';

const endpoints = {
  login: '/auth/login',
  register: '/auth/register',
  me: '/auth/me',
  logout: '/auth/logout',
  refresh: '/auth/refresh',
};

const logIn = (credentials) =>
  setRequestToken(request.post(endpoints.login, credentials));

const register = (data) => request.post(endpoints.register, data);

const me = () => setRequestToken(withToken());

const logout = () => removeRequestToken(request.post(endpoints.logout));

const withToken = () => {
  const req = attachRequestToken(request.get);
  return req(endpoints.me);
};

const setRequestToken = (req) =>
  req.then((res) => {
    if (res.data && res.data.access_token) {
      request.setAuthToken(res.data.access_token);
    }
    return res;
  });

const removeRequestToken = (req) =>
  req.then((res) => {
    request.removeToken();
    return res;
  });

const attachRequestToken = (req) => {
  request.addAuthToken();
  return req;
};

export default {
  logIn,
  register,
  me,
  logout,
};
