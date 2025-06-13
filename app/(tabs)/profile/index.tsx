import { signOut } from '@/lib/appwrite.user'
import { useGlobalContext } from '@/providers/GlobalProvider'
import { MaterialIcons } from '@expo/vector-icons'
import { Redirect, useRouter } from 'expo-router'
import React, { FC } from 'react'
import { View } from 'react-native'
import {
	Avatar,
	Button,
	Card,
	Divider,
	Text,
	TouchableRipple,
} from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile: FC = () => {
	const router = useRouter()
	const { isLoading, isLoggedIn, user, setUser, setIsLoggedIn } =
		useGlobalContext()

	if (!isLoading && !isLoggedIn) return <Redirect href='/(tabs)/profile/auth' />

	const logout = async () => {
		await signOut()
		setUser(null)
		setIsLoggedIn(false)
		router.replace('/(tabs)/home')
	}

	return (
		<SafeAreaView className='bg-gray-50 flex-1'>
			<View className='p-4'>
				{/* Profile Header */}
				{user ? (
					<Card className='mb-6 rounded-lg shadow-sm'>
						<Card.Content className='items-center'>
							<Avatar.Text
								size={80}
								label={
									user.username
										? user.username.charAt(0).toUpperCase()
										: user.email.charAt(0).toUpperCase()
								}
								className='bg-blue-500 mb-4'
							/>
							<Text variant='titleLarge' className='font-bold text-gray-800'>
								{user.username || 'Пользователь'}
							</Text>
							<Text variant='bodyMedium' className='text-gray-500 mt-1'>
								{user.email}
							</Text>
						</Card.Content>
					</Card>
				) : (
					<></>
				)}

				{/* Account Settings */}
				<Card className='mb-6 rounded-lg shadow-sm'>
					<Card.Content>
						<Text
							variant='titleMedium'
							className='font-bold text-gray-800 mb-3'
						>
							Настройки аккаунта
						</Text>

						<TouchableRipple onPress={() => router.push('/(tabs)/home')}>
							<View className='flex-row items-center py-3'>
								<MaterialIcons name='edit' size={24} color='#4b5563' />
								<Text variant='bodyLarge' className='ml-3 text-gray-700'>
									Редактировать профиль
								</Text>
							</View>
						</TouchableRipple>

						<Divider />

						<TouchableRipple onPress={() => router.push('/(tabs)/home')}>
							<View className='flex-row items-center py-3'>
								<MaterialIcons name='security' size={24} color='#4b5563' />
								<Text variant='bodyLarge' className='ml-3 text-gray-700'>
									Безопасность
								</Text>
							</View>
						</TouchableRipple>

						<Divider />

						<TouchableRipple onPress={() => router.push('/(tabs)/home')}>
							<View className='flex-row items-center py-3'>
								<MaterialIcons name='notifications' size={24} color='#4b5563' />
								<Text variant='bodyLarge' className='ml-3 text-gray-700'>
									Уведомления
								</Text>
							</View>
						</TouchableRipple>
					</Card.Content>
				</Card>

				{/* App Settings */}
				<Card className='mb-6 rounded-lg shadow-sm'>
					<Card.Content>
						<Text
							variant='titleMedium'
							className='font-bold text-gray-800 mb-3'
						>
							Настройки приложения
						</Text>

						<TouchableRipple onPress={() => router.push('/(tabs)/home')}>
							<View className='flex-row items-center py-3'>
								<MaterialIcons name='color-lens' size={24} color='#4b5563' />
								<Text variant='bodyLarge' className='ml-3 text-gray-700'>
									Тема приложения
								</Text>
							</View>
						</TouchableRipple>

						<Divider />

						<TouchableRipple onPress={() => router.push('/(tabs)/home')}>
							<View className='flex-row items-center py-3'>
								<MaterialIcons name='language' size={24} color='#4b5563' />
								<Text variant='bodyLarge' className='ml-3 text-gray-700'>
									Язык
								</Text>
							</View>
						</TouchableRipple>
					</Card.Content>
				</Card>

				{/* Logout Button */}
				<Button
					mode='outlined'
					onPress={logout}
					icon='logout'
					textColor='#ef4444'
					className='border-red-500 mt-2'
				>
					Выйти из аккаунта
				</Button>
			</View>
		</SafeAreaView>
	)
}

export default Profile
