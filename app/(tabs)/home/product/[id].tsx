import { getProduct } from '@/lib/appwrite.product'
import useAppwrite from '@/lib/hooks/useAppwrite'
import { MaterialIcons } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Dimensions, Image, ScrollView, Text, View } from 'react-native'
import { Button, Chip, Divider, IconButton } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const { width } = Dimensions.get('window')

const ProductDetails = () => {
	const { id } = useLocalSearchParams()

	const {
		data: product,
		refetch,
		isLoading,
	} = useAppwrite(() => getProduct(id as string))

	if (isLoading || !product) {
		return (
			<View className='flex-1 items-center justify-center'>
				<Text>Загрузка...</Text>
			</View>
		)
	}

	return (
		<SafeAreaView edges={['right', 'left']} className='flex-1 bg-gray-50'>
			<ScrollView className='flex-1'>
				{/* Галерея изображений */}
				<ScrollView
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					className='bg-white'
				>
					{product.images_url.map((image, index) => (
						<Image
							key={index}
							source={{ uri: image }}
							style={{ width, height: width * 0.8 }}
							resizeMode='cover'
						/>
					))}
				</ScrollView>

				{/* Основная информация */}
				<View className='p-4 bg-white'>
					<View className='flex-row justify-between items-start'>
						<Text className='text-2xl font-bold'>{product.name}</Text>
						<Chip mode='outlined' className='bg-blue-50 border-blue-200'>
							{product.condition === 'new' ? 'Новый' : 'Б/У'}
						</Chip>
					</View>

					<Text className='text-gray-500 mt-1'>{product.category.name}</Text>

					<View className='flex-row items-center mt-3'>
						<MaterialIcons name='location-on' size={18} color='#6b7280' />
						<Text className='text-gray-500 ml-1'>{product.address}</Text>
					</View>

					<View className='mt-4'>
						<Text className='text-3xl font-bold text-blue-600'>
							{product.price_per_day} ₽/день
						</Text>
						<Text className='text-gray-500'>Залог: {product.deposit} ₽</Text>
					</View>
				</View>

				<Divider className='my-2' />

				{/* Условия аренды */}
				<View className='p-4 bg-white'>
					<Text className='text-lg font-bold mb-2'>Условия аренды</Text>

					<View className='flex-row items-center mb-2'>
						<MaterialIcons name='local-shipping' size={20} color='#3b82f6' />
						<Text className='ml-2'>
							Получение: {product.product_receiving.join(', ')}
						</Text>
					</View>

					<View className='flex-row items-center'>
						<MaterialIcons name='assignment-return' size={20} color='#3b82f6' />
						<Text className='ml-2'>
							Возврат: {product.product_return.join(', ')}
						</Text>
					</View>
				</View>

				<Divider className='my-2' />

				{/* Описание */}
				<View className='p-4 bg-white'>
					<Text className='text-lg font-bold mb-2'>Описание</Text>
					<Text className='text-gray-700'>{product.description}</Text>
				</View>
			</ScrollView>

			{/* Нижняя панель с кнопками */}
			<View className='px-4 py-2 bg-white border-t border-gray-200'>
				<View className='flex-row items-center justify-between'>
					<IconButton
						icon='heart-outline'
						size={24}
						onPress={() => console.log('Add to favorites')}
					/>

					<Button
						mode='contained'
						className='flex-1 bg-blue-600'
						onPress={() => console.log('Rent')}
					>
						Арендовать
					</Button>
				</View>
			</View>
		</SafeAreaView>
	)
}

export default ProductDetails
