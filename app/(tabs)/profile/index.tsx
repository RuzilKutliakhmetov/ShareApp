import { signOut } from '@/lib/appwrite.users'
import { useGlobalContext } from '@/providers/auth/GlobalProvider'
import { router } from 'expo-router'
import React, { FC, useEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const Profile: FC = () => {
	const { isLoading, isLoggedIn, user, setUser, setIsLoggedIn } =
		useGlobalContext()
	console.log(!isLoading + '' + !isLoggedIn)
	useEffect(() => {
		if (!isLoading && !isLoggedIn) {
			router.replace('/profile/auth')
		}
	}, [isLoading, isLoggedIn])

	const logout = async () => {
		await signOut()
		setUser(null)
		setIsLoggedIn(false)
		router.replace('/(tabs)/home')
	}

	// Убираем условный рендер Redirect, так как он теперь в useEffect

	return (
		<View>
			<Text>{user?.email}</Text>
			<TouchableOpacity
				onPress={logout}
				className='flex w-full items-end mt-10'
			>
				<Text>Выйти</Text>
			</TouchableOpacity>
		</View>
	)
}

export default Profile
