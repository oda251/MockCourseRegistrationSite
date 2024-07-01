import { SupabaseClient } from '@supabase/supabase-js'
import { Class } from '../types/class';
import { Professor } from '../types/professor';

export interface ClassRepository {
	fetchClass(classId: number): Promise<Class | null>
	fetchClasses(): Promise<Class[] | null>
	fetchRegistratedClasses(userId: number): Promise<Class[] | null>
	registerClass(userId: number, classId: number): Promise<boolean>
	unregisterClass(userId: number, classId: number): Promise<boolean>
}

export class ClassRepositoryImpl {
	db: SupabaseClient;
	constructor(db: SupabaseClient) {
		this.db = db
	}
	async fetchClass(classId: number): Promise<Class | null> {
		const { data, error } = await this.db
			.from('classes')
			.select(`
				*,
				professors (id, name,
					posts(name)
				)
				`)
			.eq('id', classId)
		if (error) {
			throw error
		}
		if (!data) {
			return null
		}
		var c : Class = {
			...data[0],
		}
		return c
	
	}
	async fetchClasses(): Promise<Class[] | null> {
		const { data, error } = await this.db
			.from('classes')
			.select(`
				*,
				professors (id, name,
					posts(name)
				)
				`)
			.order('semester', { ascending: true })
			.order('day', { ascending: true })
			.order('period', { ascending: true })
		if (error) {
			throw error
		}
		if (!data) {
			return null
		}
		var classes: Class[] = data
		return classes
	}
	async fetchRegistratedClasses(userId: number): Promise<Class[] | null> {
		const { data, error } = await this.db
			.from('student_class')
			.select(`
				student_id,
				classes (
					*,
					professors (id, name)
				)
			`)
			.eq('student_id', userId)
		if (error) {
			throw error
		}
		if (!data) {
			return null
		}
		var registratedClasses: Class[] = []
		data.forEach((element) => {
			var c : Class = {
				...element.classes[0],
			}
			registratedClasses.push(c)
		})
		return registratedClasses
	}
	async registerClass(userId: number, classId: number): Promise<boolean> {
		const { data, error } = await this.db
			.from('class_register')
			.insert([{ student_id: userId, class_id: classId }])
		if (error) {
			throw error
		}
		if (!data) {
			return false
		}
		return true
	}
	async unregisterClass(userId: number, classId: number): Promise<boolean> {
		const { data, error } = await this.db
			.from('class_register')
			.delete()
			.eq('student_id', userId)
			.eq('class_id', classId)
		if (error) {
			throw error
		}
		if (!data) {
			return false
		}
		return true
	}
}
