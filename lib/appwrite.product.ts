import { IProductAW } from '@/types/appwrite.interface'
import { Models, Query } from 'react-native-appwrite'
import { getCategories } from './appwrite.category'
import { config, databases } from './appwrite.config'

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

		const product = productsList.documents[0] as IProductAW
		console.log(product)
		return product
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

export const getProductsBySearch = async (
	searchTerm: string
): Promise<IProductAW[]> => {
	try {
		// Ищем товары по названию или описанию
		const productsResponse = await databases.listDocuments(
			config.databaseId,
			config.productsCollectionId,
			[
				Query.search('name', searchTerm),
				Query.or([Query.search('description', searchTerm)]),
				Query.limit(50), // Ограничиваем количество результатов
			]
		)

		// Получаем полные данные категорий для каждого товара
		const productsWithCategories = await Promise.all(
			productsResponse.documents.map(async (product: any) => {
				if (product.category && typeof product.category === 'string') {
					try {
						const category = await databases.getDocument(
							config.databaseId,
							config.productsCollectionId,
							product.category
						)
						return { ...product, category }
					} catch (error) {
						console.error('Error fetching category:', error)
						return product
					}
				}
				return product
			})
		)

		return productsWithCategories as IProductAW[]
	} catch (error) {
		console.error('Error searching products:', error)
		throw error
	}
}
