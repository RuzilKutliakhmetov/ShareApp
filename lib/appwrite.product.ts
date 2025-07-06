import { IProductAW } from '@/types/appwrite.interface'
import { Models, Query } from 'react-native-appwrite'
import { config, databases } from './appwrite'
import { getCategories } from './appwrite.category'

export async function getAllProducts() {
	try {
		let productsList: Models.DocumentList<Models.Document> | null = null

		productsList = await databases.listDocuments(
			config.databaseId,
			config.productsCollectionId
		)

		const products = productsList.documents as IProductAW[]
		return products
	} catch (error) {
		const errorMessage = error as string
		throw new Error(errorMessage)
	}
}

export async function getLatestProducts() {
	try {
		let productsList: Models.DocumentList<Models.Document> | null = null

		productsList = await databases.listDocuments(
			config.databaseId,
			config.productsCollectionId
		)

		const products = productsList.documents as IProductAW[]
		return products
	} catch (error) {
		const errorMessage = error as string
		throw new Error(errorMessage)
	}
}

export async function getProduct(id: string | null) {
	try {
		let productsList: Models.DocumentList<Models.Document> | null = null

		if (id === null) return null

		productsList = await databases.listDocuments(
			config.databaseId,
			config.productsCollectionId,
			[Query.equal('$id', id)]
		)

		const products = productsList.documents[0] as IProductAW
		return products
	} catch (error) {
		const errorMessage = error as string
		throw new Error(errorMessage)
	}
}

export async function getProductsByParentCategory(
	parentCategory: string
): Promise<IProductAW[]> {
	try {
		let productsList: Models.DocumentList<Models.Document> | null = null
		const categoriesList = await getCategories(parentCategory)

		// Создаем массив условий для Query.or
		const conditions = categoriesList.map(category =>
			Query.equal('category', category.$id)
		)

		// Если категорий нет, возвращаем пустой массив
		if (conditions.length === 0) {
			return []
		}

		// Создаем Query.or с правильным типом
		const query = Query.or(conditions)

		productsList = await databases.listDocuments(
			config.databaseId,
			config.productsCollectionId,
			[query]
		)

		const products = (productsList?.documents as IProductAW[]) || []
		return products
	} catch (error) {
		const errorMessage = error as string
		throw new Error(errorMessage)
	}
}
