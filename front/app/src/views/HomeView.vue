<template>
  <div class="home">
	<h1 class="text-4xl">Hello, World!</h1>
  </div>
</template>

<!-- <script lang="ts">
import { defineComponent } from 'vue'
import { authStore } from '@/store/authStore';

export default defineComponent({
  name: 'HomeView',
  methods: {
	async logout () {
		const auth = authStore()
		return auth.logout()
		.then(() => {
			this.$router.push({ path: '/login' })
		})
		.catch((error: Error) => {
			throw error
		})
	
	}
  }
});
</script> -->
