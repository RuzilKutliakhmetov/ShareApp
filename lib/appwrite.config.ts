import {
	Account,
	Avatars,
	Client,
	Databases,
	Storage,
} from 'react-native-appwrite'

export const config = {
	platform: 'com.rk.shareapp',
	// endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
	endpoint: 'https://cloud.appwrite.io/v1',
	// projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
	projectId: '67ed5a510002be4bc816',
	storageId: '67f2a436000c17a4f13c',
	databaseId: '67ed5c8a0012c71a5c64',
	usersCollectionId: '67ed5c94003191cb63c8',
	productsCollectionId: '67ed60f10009a99cf24c',
	categoriesCollectionId: '67ed63490038c2555863',
	rentalsCollectionId: '67ed6670002c1c374096',
	reviewsCollectionId: '67ed687d00300844f5df',
}

export const client = new Client()

client
	.setProject(config.endpoint!)
	.setProject(config.projectId!)
	.setPlatform(config.platform!)

export const avatars = new Avatars(client)
export const account = new Account(client)
export const storage = new Storage(client)
export const databases = new Databases(client)
