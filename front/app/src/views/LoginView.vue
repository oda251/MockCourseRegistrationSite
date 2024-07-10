<template>
	<div class="login-view">
		<LoginForm :login="handleLogin" />
	</div>
</template>

<script>
import { defineComponent } from 'vue'
import LoginForm from '@/components/LoginForm.vue'
import { authStore } from '@/store/authStore';

export default defineComponent({
	name: 'LoginView',
	components: {
		LoginForm
	},
	methods: {
		async handleLogin (authInfo) {
			const auth = authStore()
			return auth.login(authInfo)
			.then(() => {
				this.$router.push({ path: '/' })
			})
			.catch(error => {
				throw error
			})
		}
	}
});
</script>