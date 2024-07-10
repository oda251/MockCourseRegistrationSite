import axios from 'axios';
import type { LoginParams } from '../@types/reqParams';
import type { UserInfo } from '@/@types/user';

const headers = {
	'Content-Type': 'application/json',
};

const config = {
	method: undefined as string | undefined,
	url: 'example.com' as string,
	headers: headers,
	data: null as LoginParams | null,
}

interface LoginResponse {
	userInfo: UserInfo;
}

const AuthApi = {
	login: async (authInfo: LoginParams) => {
		config.method = 'post';
		config.url += '/login';
		config.data = authInfo;
		return axios.request<LoginResponse>(config)
		.then((res) => res.data.userInfo)
		.catch((error) => {
			console.error(error);
		});
	},
	logout: async () => {
		config.method = 'delete'
		return axios.request(config)
		.then(res=>res)
		.catch(error=>console.error(error));
	}
}

export default AuthApi;