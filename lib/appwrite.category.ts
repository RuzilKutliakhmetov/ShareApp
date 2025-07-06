import { ICategoryAW } from '@/types/appwrite.interface'
import { Models, Query } from 'react-native-appwrite'
import { config, databases } from './appwrite'

export async function getCategories(id: string | null) {
	try {
		let categoriesList: Models.DocumentList<Models.Document> | null = null
		if (id === null)
			categoriesList = await databases.listDocuments(
				config.databaseId,
				config.categoriesCollectionId,
				[Query.isNull('parent_id')]
			)
		else
			categoriesList = await databases.listDocuments(
				config.databaseId,
				config.categoriesCollectionId,
				[Query.equal('parent_id', id)]
			)

		const categories = categoriesList.documents as ICategoryAW[]
		return categories
	} catch (error) {
		const errorMessage = error as string
		throw new Error(errorMessage)
	}
}
