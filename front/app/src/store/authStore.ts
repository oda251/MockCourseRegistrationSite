import { defineStore } from 'pinia'
import AuthApi from '@/api/auth'
import type { LoginParams } from '@/@types/reqParams'
import type { UserInfo } from '@/@types/user'

export const authStore = defineStore({
  id: 'auth',
  state: () => ({
	userInfo: null as UserInfo | null,
  }),
  getters: {
	isLoggedIn: (state) => !!state.userInfo,
  },
  actions: {
	async login(params: LoginParams) {
		return AuthApi.login(params)
		.then((res) => {
			this.userInfo = res ? res : null
		})
		.catch((error) => {
			console.error(error)
		})
	},
	async logout() {
		return AuthApi.logout()
		.then(() => {
			this.userInfo = null
		})
		.catch((error) => {
			console.error(error)
		})
	},
  }
})
