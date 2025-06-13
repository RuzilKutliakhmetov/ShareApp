import { ProductTile } from '@/components/ui/tiles/ProductTile'
import { getProductsBySearch } from '@/lib/appwrite.product'
import { IProductAW } from '@/types/appwrite.interface'
import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { FC, useState } from 'react'
import {
	Dimensions,
	FlatList,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { Button, Chip, IconButton, Menu, Searchbar } from 'react-native-paper'

const Search: FC = () => {
	const router = useRouter()
	const [searchQuery, setSearchQuery] = useState('')
	const [products, setProducts] = useState<IProductAW[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [filtersVisible, setFiltersVisible] = useState(false)
	const [selectedCategories, setSelectedCategories] = useState<string[]>([])
	const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
	const [condition, setCondition] = useState<'all' | 'new' | 'used'>('all')

	// Фильтры
	const categories = [
		{ id: 'cars', name: 'Автомобили' },
		{ id: 'electronics', name: 'Электроника' },
		{ id: 'tools', name: 'Инструменты' },
		{ id: 'sports', name: 'Спорт' },
	]

	// Поиск товаров
	const handleSearch = async () => {
		if (!searchQuery.trim()) return

		setIsLoading(true)
		try {
			const results = await getProductsBySearch(searchQuery)
			setProducts(results)
		} catch (error) {
			console.error('Search error:', error)
		} finally {
			setIsLoading(false)
		}
	}

	// Фильтрация результатов
	const filteredProducts = products.filter(product => {
		// Фильтр по категориям
		if (
			selectedCategories.length > 0 &&
			!selectedCategories.includes(product.category?.id)
		) {
			return false
		}

		// Фильтр по состоянию
		if (condition !== 'all' && product.condition !== condition) {
			return false
		}

		// Фильтр по цене
		if (
			product.price_per_day < priceRange[0] ||
			product.price_per_day > priceRange[1]
		) {
			return false
		}

		return true
	})

	return (
		<View className='flex-1 bg-gray-50'>
			{/* Шапка с поиском */}
			<View className='bg-white px-4 pt-2 pb-3'>
				<View className='flex-row items-center'>
					<IconButton
						icon='arrow-back'
						size={24}
						onPress={() => router.back()}
					/>
					<Searchbar
						placeholder='Поиск товаров...'
						value={searchQuery}
						onChangeText={setSearchQuery}
						onSubmitEditing={handleSearch}
						className='flex-1 ml-2'
						autoFocus
					/>
				</View>

				{/* Быстрые фильтры */}
				<View className='flex-row mt-2 space-x-2'>
					<Button
						mode='outlined'
						compact
						onPress={() => setFiltersVisible(true)}
						icon='tune'
						className='rounded-full'
					>
						Фильтры
					</Button>

					<Chip
						mode='outlined'
						selected={condition === 'new'}
						onPress={() => setCondition(condition === 'new' ? 'all' : 'new')}
						icon='star'
					>
						Новые
					</Chip>

					<Chip
						mode='outlined'
						selected={condition === 'used'}
						onPress={() => setCondition(condition === 'used' ? 'all' : 'used')}
						icon='history'
					>
						Б/У
					</Chip>
				</View>
			</View>

			{/* Меню фильтров */}
			<Menu
				visible={filtersVisible}
				onDismiss={() => setFiltersVisible(false)}
				anchor={<View />}
				contentStyle={{
					backgroundColor: 'white',
					padding: 16,
					width: Dimensions.get('window').width - 32,
				}}
			>
				<Text className='text-lg font-bold mb-4'>Фильтры</Text>

				<Text className='font-medium mt-4'>Категории</Text>
				<View className='flex-row flex-wrap mt-2'>
					{categories.map(category => (
						<TouchableOpacity
							key={category.id}
							onPress={() => {
								setSelectedCategories(prev =>
									prev.includes(category.id)
										? prev.filter(id => id !== category.id)
										: [...prev, category.id]
								)
							}}
							className={`mr-2 mb-2 px-3 py-1 rounded-full ${
								selectedCategories.includes(category.id)
									? 'bg-blue-100 border-blue-500'
									: 'bg-gray-100'
							} border`}
						>
							<Text
								className={
									selectedCategories.includes(category.id)
										? 'text-blue-600'
										: 'text-gray-700'
								}
							>
								{category.name}
							</Text>
						</TouchableOpacity>
					))}
				</View>

				<Text className='font-medium mt-4'>Цена, ₽/день</Text>
				<View className='flex-row justify-between items-center mt-2'>
					<Text>{priceRange[0]}</Text>
					<Text>-</Text>
					<Text>{priceRange[1]}</Text>
				</View>
				{/* Здесь можно добавить RangeSlider */}

				<View className='flex-row justify-between mt-6'>
					<Button
						mode='outlined'
						onPress={() => {
							setSelectedCategories([])
							setCondition('all')
							setPriceRange([0, 10000])
						}}
					>
						Сбросить
					</Button>
					<Button
						mode='contained'
						onPress={() => setFiltersVisible(false)}
						className='ml-4'
					>
						Применить
					</Button>
				</View>
			</Menu>

			{/* Результаты поиска */}
			{isLoading ? (
				<View className='flex-1 items-center justify-center'>
					<Text>Поиск...</Text>
				</View>
			) : filteredProducts.length > 0 ? (
				<FlatList
					data={filteredProducts}
					keyExtractor={item => item.$id}
					renderItem={({ item }) => <ProductTile product={item} />}
					numColumns={2}
					contentContainerStyle={{ padding: 8 }}
					showsVerticalScrollIndicator={false}
				/>
			) : (
				<View className='flex-1 items-center justify-center p-8'>
					<MaterialIcons name='search-off' size={48} color='#9ca3af' />
					<Text className='text-lg font-medium mt-4 text-gray-500'>
						{products.length === 0
							? 'Начните поиск товаров'
							: 'Ничего не найдено. Попробуйте изменить фильтры'}
					</Text>
					{products.length === 0 && (
						<Button mode='contained' onPress={handleSearch} className='mt-4'>
							Попробовать снова
						</Button>
					)}
				</View>
			)}
		</View>
	)
}

export default Search
