import { IProductAW } from './appwrite.interface'

export interface ICategory {
	name: string
	description: string
	parent_id: string | null
	is_child: boolean
	products: IProductAW[]
}
