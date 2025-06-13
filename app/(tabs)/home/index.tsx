import EmptyState from '@/components/tabs/EmptyState'
import NewProducts from '@/components/ui/NewProducts'
import { ProductTile } from '@/components/ui/tiles/ProductTile'
import { getAllProducts, getLatestProducts } from '@/lib/appwrite.product'
import useAppwrite from '@/lib/hooks/useAppwrite'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { FlatList, RefreshControl, Text, View } from 'react-native'
import {
	Button,
	IconButton,
	Searchbar,
	TouchableRipple,
} from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Index() {
	const { data: products, refetch } = useAppwrite(getAllProducts)
	const { data: latestProducts } = useAppwrite(getLatestProducts)
	const [searchQuery, setSearchQuery] = useState('')
	const [refreshing, setRefreshing] = useState(false)
	const [activeCategory, setActiveCategory] = useState('all')

	const router = useRouter()

	const onRefresh = async () => {
		setRefreshing(true)
		await refetch()
		setRefreshing(false)
	}

	const handleSearchPress = () => {
		router.push('/(tabs)/home/search')
	}

	return (
		<SafeAreaView
			edges={['top', 'right', 'left']}
			className='flex-1 bg-gray-50'
		>
			{/* Поисковая строка */}
			<View className='px-4 pt-2 pb-2 bg-white'>
				<TouchableRipple
					onPress={handleSearchPress}
					borderless
					style={{ borderRadius: 8 }}
				>
					<View pointerEvents='none'>
						<Searchbar
							placeholder='Поиск товаров...'
							value={searchQuery}
							className='rounded-lg'
							iconColor='#6b7280'
							inputStyle={{ color: '#374151' }}
							placeholderTextColor='#9ca3af'
							editable={false}
						/>
					</View>
				</TouchableRipple>
			</View>

			{/* Основной контент */}
			<FlatList
				data={products}
				numColumns={2}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				keyExtractor={item => item.$id}
				renderItem={({ item }) => <ProductTile product={item} />}
				ListHeaderComponent={() => (
					<View className='pb-4'>
						{/* Новые товары */}
						<View className='flex-row justify-between items-center px-4 pt-4 pb-2'>
							<Text className='text-xl font-bold'>Новые</Text>
							<Button
								mode='text'
								onPress={() => console.log('See all')}
								textColor='#3b82f6'
							>
								Все
							</Button>
						</View>
						<NewProducts products={latestProducts ?? []} />

						{/* Популярные категории */}
						<View className='px-4 pt-6 pb-2'>
							<Text className='text-xl font-bold'>Рекомендуем</Text>
						</View>
					</View>
				)}
				ListEmptyComponent={() => (
					<EmptyState
						title='Товары не найдены'
						subtitle='Попробуйте изменить параметры поиска'
					/>
				)}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						colors={['#3b82f6']}
					/>
				}
				contentContainerStyle={{ paddingBottom: 80 }}
				className='bg-gray-50'
			/>

			{/* Кнопка фильтров */}
			<View className='absolute bottom-6 right-6'>
				<IconButton
					icon='tune'
					mode='contained'
					size={28}
					containerColor='#3b82f6'
					iconColor='white'
					onPress={() => console.log('Filters pressed')}
				/>
			</View>
		</SafeAreaView>
	)
}
