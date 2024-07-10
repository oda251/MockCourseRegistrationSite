<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoginForm',
  data () {
	return {
	  email: '',
	  password: ''
	}
  },
  props: {
	login: {
		type: Function,
		required: true
	}
  },
  methods: {
	handle () {
		return this.login({
			'user': {
				'email': this.email,
				'password': this.password
			}
		})
		.catch((error: Error) => {
			throw error
		})
	}
  }
});
</script>

<template>
    <div class="login max-w-md mx-auto mt-10">
        <h1 class="font-bold text-2xl mb-5">Login</h1>
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                    Email
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" id="email" name="email" required>
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Password
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" id="password" name="password" required>
            </div>
            <div class="flex items-center justify-between">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Login
                </button>
            </div>
        </form>
    </div>
</template>