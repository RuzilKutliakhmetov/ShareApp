import { IAuthFormData } from '@/types/auth.interface'

import { IUserAW } from '@/types/appwrite.interface'
// import * as Crypto from 'expo-crypto'
import { ID, Query } from 'react-native-appwrite'
import { account, avatars, config, databases } from './appwrite.config'

// Register user
export async function signUp(inputData: IAuthFormData) {
	try {
		console.log(inputData)
		const newAccount = await account.create(
			ID.unique(),
			inputData.email,
			inputData.password,
			inputData.username
		)
		if (!newAccount) throw Error

		const avatarUrl = avatars.getInitials(inputData.username)
		const password_hash = inputData.password //await hashingPassword(inputData.password)
		await login(inputData.email, password_hash)

		const newUser: IUserAW = await databases.createDocument(
			config.databaseId,
			config.usersCollectionId,
			ID.unique(),
			{
				account_id: newAccount.$id,
				email: inputData.email,
				username: inputData.username,
				avatar: avatarUrl,
				password: password_hash,
				phone: inputData.phone,
			}
		)
		return newUser
	} catch (error) {
		throw error
	}
}

// Sign In
export async function signIn(inputData: IAuthFormData) {
	try {
		const user = await getAccountByEmail(inputData)
		if (user) await login(user.email, user.password)
		else return null
		return user
	} catch (error) {
		throw error
	}
}

// async function hashingPassword(password: string) {
// 	return await Crypto.digestStringAsync(
// 		Crypto.CryptoDigestAlgorithm.SHA256,
// 		password
// 	)
// }

async function getAccountByEmail(inputData: IAuthFormData) {
	const password_hash = inputData.password //await hashingPassword(inputData.password)
	const currentUser = await databases.listDocuments(
		config.databaseId,
		config.usersCollectionId,
		[
			Query.and([
				Query.equal('email', inputData.email),
				Query.equal('password', password_hash),
			]),
		]
	)
	if (!currentUser) throw Error
	const users = currentUser.documents as IUserAW[]
	return users[0]
}

// Sign Out
export async function signOut() {
	try {
		const session = await account.deleteSession('current')
		return session
	} catch (error) {
		const errorMessage = error as string
		throw new Error(errorMessage)
	}
}

// Get Account
export async function getAccount() {
	try {
		const currentAccount = await account.get()
		return currentAccount
	} catch (error) {
		const errorMessage = error as string
		throw new Error(errorMessage)
	}
}

async function login(email: string, password: string) {
	try {
		return await account.createEmailPasswordSession(email, password)
	} catch (error) {
		throw error
	}
}

// Get Current User
export async function getCurrentUser<IUserAW>() {
	try {
		const currentAccount = await getAccount()
		if (!currentAccount) throw Error

		const currentUser = await databases.listDocuments(
			config.databaseId,
			config.usersCollectionId,
			[Query.equal('account_id', currentAccount.$id)]
		)

		if (!currentUser) throw Error
		const users = currentUser.documents as IUserAW[]

		return users[0]
	} catch (error) {
		console.log(error)
		return null
	}
}
