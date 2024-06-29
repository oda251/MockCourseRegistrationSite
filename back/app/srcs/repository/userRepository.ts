import { supabase } from './supabase'
import { Tables } from './schema'

export default class UserRepository {
	static async findByEmail(email: string): Promise<Tables<'students'> | null> {
		const { data, error } = await supabase
			.from('students')
			.select('*')
			.eq('email', email)
		if (error) {
			throw error
		}
		if (!data) {
			return null
		}
		return data[0]
	}
}
