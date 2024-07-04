import { SupabaseClient } from '@supabase/supabase-js'
import { Class } from '../types/class';
import { Professor } from '../types/professor';

export interface ProfessorRepository {
	fetchProfessorClasses(professorId: number): Promise<Class[] | null>
	fetchProfessorInfo(professorId: number): Promise<Professor | null>
}

export class ClassRepositoryImpl {
	db: SupabaseClient;
	constructor(db: SupabaseClient) {
		this.db = db
	}
	async fetchProfessorClasses(professorId: number): Promise<Class[] | null> {
		const { data, error } = await this.db
			.from('professor_class')
			.select(`
				classes (
					*,
					professors (id, name,
						posts(name)
					)
				)
				`)
			.eq('professor_id', professorId)
		if (error) {
			throw error
		}
		if (!data) {
			return null
		}
		var classes: Class[] = data
		return classes
	}
}
