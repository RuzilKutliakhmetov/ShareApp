import { IProductAW } from './appwrite.interface'

enum Role {
	'user',
	'admin',
}

export interface IUser {
	username: string
	email: string
	password: string
	phone: string
	rating?: string
	isBlocked: boolean
	role: Role
	account_id: string
	avatar: string
	saved_products: IProductAW[]
	products: IProductAW[]
}
