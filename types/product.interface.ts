import { IUserAW } from './appwrite.interface'

export interface IProduct {
	name: string
	description: string
	price_per_day: number
	deposit: number
	status: ProductStatus
	condition: ProductCondition
	user: IUserAW
	category: CategoryRelationship
	product_return: ProductReturnStatus[]
	product_receiving: ProductReceivingStatus[]
	address: string
	images_url: string[]
}

// Перечисления
export enum ProductStatus {
	ACTIVE = 'available',
	RENTED = 'rented',
	RESERVED = 'reserved',
	ARCHIVED = 'archived',
	BLOCKED = 'blocked',
}

export enum ProductCondition {
	NEW = 'new',
	USED = 'used',
}

export enum ProductReturnStatus {
	PENDING = 'pickup',
	RETURNED = 'delivery',
}

export enum ProductReceivingStatus {
	PENDING = 'pickup',
	RECEIVED = 'delivery',
}

// Отношения
export interface UserRelationship {
	id: number
	username: string
	email: string
}

export interface CategoryRelationship {
	id: number
	name: string
}
