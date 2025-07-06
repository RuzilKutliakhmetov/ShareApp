import {
	getReformatedStatusColor,
	getReformatedStatusText,
} from '@/helper/status.reformat'
import { IProductAW } from '@/types/appwrite.interface'
import { useRouter } from 'expo-router'
import { FC } from 'react'
import { Dimensions, Text, TouchableOpacity, View } from 'react-native'
import CustomCarousel from './CustomCarousel'
interface ProductItemProps {
	product: IProductAW
}

export const ProductItem: FC<ProductItemProps> = ({ product }) => {
	const data = product.images_url
	const width = Dimensions.get('window').width

	const router = useRouter()

	const handlePress = () => {
		router.setParams({ id: product.$id })
		router.navigate(`/(tabs)/home/product/${product.$id}`)
	}
	return (
		<View className='bg-backgroundPrimary rounded-lg pb-2'>
			<TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
				<CustomCarousel data={data} width={width} />

				<View className='flex flex-row justify-between items-center px-1'>
					<View className='flex flex-row gap-1 items-end'>
						<Text className='text-2xl'>{product.price_per_day}</Text>
						<Text className='text-xl'>{'\u20BD'}</Text>
					</View>
					<Text
						className={`font-semibold ${getReformatedStatusColor(
							product.status
						)}`}
					>
						{getReformatedStatusText(product.status)}
					</Text>
				</View>

				<Text className='px-1 font-semibold'>{product.name}</Text>
			</TouchableOpacity>
		</View>
	)
}
