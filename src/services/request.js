import axios from 'axios';
import { LOCAL_STORAGE_TOKEN } from '../constants/constants';

export const BASE_API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const chrome = global.chrome;

const defaultConfig = {
	// Here you can add boilerplate configuration
	// Example config:
	baseURL: BASE_API_ENDPOINT,
	// headers: { 'X-Authorization': myToken }
	// for more info visit https://github.com/axios/axios#request-config
	responseType: 'json' // this will be the default response.
};

/**
 * Axios instance closure.
 */
function request(config = defaultConfig) {
	const instance = axios.create(config);

	function addResponseInterceptors(onFulfilled, onRejected) {
		instance.interceptors.response.use(onFulfilled, onRejected);
	}

	function getToken() {
		return new Promise(resolve => {
			chrome.storage.sync.get([LOCAL_STORAGE_TOKEN], items => {
				resolve(items[LOCAL_STORAGE_TOKEN]);
			});
		});
	}

	function attachTokenHeader(token) {
		instance.defaults.headers.Authorization = `Bearer ${token}`;
	}

	async function addAuthToken() {
		const auth = instance.defaults.headers.Authorization;

		if (!auth) {
			const token = await getToken();
			instance.defaults.headers.Authorization = `Bearer ${token}`;
		}

		return instance;
	}

	function setAuthToken(token) {
		chrome.storage.sync.set({ [LOCAL_STORAGE_TOKEN]: token });
		instance.defaults.headers.Authorization = `Bearer ${token}`;
	}

	function removeToken() {
		chrome.storage.sync.remove(LOCAL_STORAGE_TOKEN);
		instance.defaults.headers.Authorization = undefined;
	}

	return {
		...instance,
		getToken,
		addAuthToken,
		setAuthToken,
		removeToken,
		addResponseInterceptors,
		attachTokenHeader
	};
}

export default request();
