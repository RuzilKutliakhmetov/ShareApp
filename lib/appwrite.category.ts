import { ICategoryAW } from '@/types/appwrite.interface'
import { Models, Query } from 'react-native-appwrite'
import { config, databases } from './appwrite.config'

export async function getCategories(id: string | null): Promise<ICategoryAW[]> {
	try {
		let categoriesList: Models.DocumentList<Models.Document>

		if (id === null) {
			categoriesList = await databases.listDocuments(
				config.databaseId,
				config.categoriesCollectionId,
				[Query.isNull('parent_id')]
			)
		} else {
			categoriesList = await databases.listDocuments(
				config.databaseId,
				config.categoriesCollectionId,
				[Query.equal('parent_id', id)]
			)
		}

		return categoriesList.documents as ICategoryAW[]
	} catch (error) {
		console.error('Error fetching categories:', error)
		throw error
	}
}

export const getAllCategories = async (): Promise<ICategoryAW[]> => {
	try {
		const response = await databases.listDocuments(
			config.databaseId,
			config.categoriesCollectionId
		)
		return response.documents as ICategoryAW[]
	} catch (error) {
		console.error('Error fetching all categories:', error)
		throw error
	}
}
