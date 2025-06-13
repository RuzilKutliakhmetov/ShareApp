import {
	getReformatedStatusColor,
	getReformatedStatusText,
} from '@/helper/status.reformat'
import { IProductAW } from '@/types/appwrite.interface'
import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { FC, useState } from 'react'
import { Dimensions, Text, TouchableOpacity, View } from 'react-native'
import CustomCarousel from '../CustomCarousel'

interface ProductTileProps {
	product: IProductAW
	onPress?: () => void
}

export const ProductTile: FC<ProductTileProps> = ({ product, onPress }) => {
	const data = product.images_url
	const width = Dimensions.get('window').width
	const router = useRouter()
	const [isFavorite, setIsFavorite] = useState(false)

	const handlePress = () => {
		if (onPress) {
			onPress()
		} else {
			router.setParams({ id: product.$id })
			router.navigate(`/(tabs)/home/product/${product.$id}`)
		}
	}

	const toggleFavorite = (e: any) => {
		e.stopPropagation()
		setIsFavorite(!isFavorite)
	}

	return (
		<View className='bg-white rounded-lg overflow-hidden shadow-sm m-2'>
			<View className='relative'>
				{/* Обернули карусель в TouchableOpacity вместо всего компонента */}
				<TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
					<CustomCarousel data={data} width={width} />
				</TouchableOpacity>

				{/* Кнопка избранного */}
				<TouchableOpacity
					onPress={toggleFavorite}
					className='absolute top-2 right-2 bg-white/80 p-1 rounded-full'
					style={{ elevation: 2 }}
				>
					<MaterialIcons
						name={isFavorite ? 'favorite' : 'favorite-border'}
						size={24}
						color={isFavorite ? '#ef4444' : '#6b7280'}
					/>
				</TouchableOpacity>
			</View>

			{/* Остальная часть контента также обернута в TouchableOpacity */}
			<TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
				<View className='p-2'>
					<Text className='text-lg font-semibold' numberOfLines={1}>
						{product.name}
					</Text>

					<View className='flex-row justify-between items-center mt-2'>
						<View className='flex-row items-end'>
							<Text className='text-xl font-bold text-blue-600'>
								{product.price_per_day}
							</Text>
							<Text className='text-lg text-gray-500 ml-1'>₽/день</Text>
						</View>

						<View
							className={`px-2 py-1 rounded-full ${getReformatedStatusColor(
								product.status
							)}`}
						>
							<Text className='text-xs font-medium text-white'>
								{getReformatedStatusText(product.status)}
							</Text>
						</View>
					</View>

					<View className='flex-row items-center mt-2'>
						<MaterialIcons name='location-on' size={16} color='#9ca3af' />
						<Text className='text-sm text-gray-500 ml-1' numberOfLines={1}>
							{product.address}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	)
}
