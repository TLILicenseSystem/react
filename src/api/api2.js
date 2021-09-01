import axios from "axios";

//const baseURL = 'http://localhost:8080/licenseexam';
const baseURL = "https://dev-smws.thailife.com:8443/wsLicenseAgentSpring/licenseexam/";

const refreshToken = async () => {
  // call api refreshToken
  const newToken = 'new token';
  return newToken;
};

const defaultOptions = {
  baseURL,
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
  },
};

const api = axios.create(defaultOptions);

api.interceptors.request.use(
	async (config) => {
		let newConfig = {};
		const token = 'token';
		if (token) {
			newConfig = {
				...config,
				// headers: {authorization: `Bearer ${token}`},
			};
			return newConfig;
		}
		else {
			return config;
		}
	},
	(error) => {
		return Promise.reject(error);
	},
);

api.interceptors.response.use(
	(response) => {
    console.log('success', response);
		return response;
	},
	async (error) => {
    console.log('error', error);
		if (error.response && error.response.status === 401) {
			const token = await refreshToken();
			const config = {
				...error.config,
				headers: {...error.config.headers, authorization: `Bearer ${token}`},
			};
			return api(config);
		}
		return Promise.reject(error);
	},
);

export default api;
