import EmptyState from '@/components/tabs/EmptyState'
import Header from '@/components/tabs/Header'
import { ProductTile } from '@/components/ui/tiles/ProductTile'
import { useGlobalContext } from '@/providers/GlobalProvider'
import { IProductAW } from '@/types/appwrite.interface'
import { router } from 'expo-router'
import React, { FC, useEffect, useState } from 'react'
import { FlatList, RefreshControl, View } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const Saved: FC = () => {
	const { user, refreshUser } = useGlobalContext()
	const [savedProducts, setSavedProducts] = useState<IProductAW[] | null>(null)
	const [refreshing, setRefreshing] = useState(false)

	useEffect(() => {
		if (user) {
			setSavedProducts(user.saved_products)
		} else {
			setSavedProducts([])
		}
	}, [user])

	const onRefresh = async () => {
		setRefreshing(true)
		try {
			await refreshUser()
		} finally {
			setRefreshing(false)
		}
	}

	const handleProductPress = (productId: string) => {
		router.setParams({ id: productId })
		router.navigate(`/(tabs)/home/product/${productId}`)
	}

	if (savedProducts === null) {
		return (
			<SafeAreaView className='flex-1 bg-backgroundPrimary items-center justify-center'>
				<ActivityIndicator size='large' />
			</SafeAreaView>
		)
	}

	return (
		<SafeAreaView className='flex-1 bg-backgroundPrimary'>
			<FlatList
				data={savedProducts}
				keyExtractor={item => item.$id}
				renderItem={({ item }) => (
					<ProductTile
						product={item}
						onPress={() => handleProductPress(item.$id)}
					/>
				)}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
				ListEmptyComponent={() => (
					<View className='flex-1 pt-10'>
						<EmptyState
							title='Нет сохраненных товаров'
							subtitle='Добавляйте товары в избранное, чтобы они появились здесь'
							// icon="heart-outline"
						/>
						{!user && (
							<Text className='text-center mt-4 text-gray-500'>
								Войдите в аккаунт, чтобы сохранять товары
							</Text>
						)}
					</View>
				)}
				ListHeaderComponent={() => <Header title='Избранное' />}
				ListFooterComponent={() => (
					<View className='pb-6 pt-4'>
						{savedProducts.length > 0 && (
							<Text className='text-center text-gray-500'>
								{savedProducts.length} товаров
							</Text>
						)}
					</View>
				)}
				ItemSeparatorComponent={() => <View className='h-4' />}
				contentContainerStyle={
					savedProducts?.length === 0 ? { flexGrow: 1 } : { paddingBottom: 20 }
				}
			/>
		</SafeAreaView>
	)
}

export default Saved
