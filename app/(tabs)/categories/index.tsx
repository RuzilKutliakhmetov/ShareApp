import { CategoryTile } from '@/components/ui/tiles/CategoryTile'
import { getAllCategories, getCategories } from '@/lib/appwrite.category'
import useAppwrite from '@/lib/hooks/useAppwrite'
import { ICategoryAW } from '@/types/appwrite.interface'
import { MaterialIcons } from '@expo/vector-icons'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { FlatList, RefreshControl, Text, View } from 'react-native'
import { ActivityIndicator, Appbar, Card, Searchbar } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const Category: FC = () => {
	const [parentCategoryId, setParentCategoryId] = useState<string | null>(null)
	const [searchQuery, setSearchQuery] = useState('')
	const [refreshing, setRefreshing] = useState(false)
	const [allCategories, setAllCategories] = useState<ICategoryAW[]>([])

	const {
		data: currentCategories,
		refetch,
		isLoading,
	} = useAppwrite(
		useCallback(() => getCategories(parentCategoryId), [parentCategoryId])
	)

	useEffect(() => {
		const loadAllCategories = async () => {
			const all = await getAllCategories()
			setAllCategories(all)
		}
		loadAllCategories()
	}, [])

	useEffect(() => {
		refetch()
	}, [parentCategoryId])

	const onRefresh = async () => {
		setRefreshing(true)
		await refetch()
		setRefreshing(false)
	}

	const getCategoryNameById = (categoryId: string | null): string => {
		if (!categoryId) return 'Категории'
		const category = allCategories.find(c => c.$id === categoryId)
		return category?.name || 'Подкатегория'
	}

	const filteredCategories = searchQuery
		? allCategories
				.filter(
					category =>
						category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
						(category.description &&
							category.description
								.toLowerCase()
								.includes(searchQuery.toLowerCase()))
				)
				.filter(
					category =>
						!parentCategoryId ||
						parentCategoryId === category.parent_id ||
						(category.parent_id &&
							allCategories.find(c => c.$id === category.parent_id)
								?.parent_id === parentCategoryId)
				)
		: currentCategories || []

	return (
		<SafeAreaView
			edges={['right', 'bottom', 'left']}
			className='flex-1 bg-gray-50'
		>
			<Appbar.Header className='bg-white'>
				{parentCategoryId && (
					<Appbar.BackAction onPress={() => setParentCategoryId(null)} />
				)}
				<Appbar.Content
					title={getCategoryNameById(parentCategoryId)}
					titleStyle={{ fontWeight: 'bold' }}
				/>
			</Appbar.Header>

			<View className='px-4'>
				<Searchbar
					placeholder='Поиск по всем категориям...'
					onChangeText={setSearchQuery}
					value={searchQuery}
					className='rounded-lg'
					iconColor='#6b7280'
					inputStyle={{ color: '#374151' }}
					placeholderTextColor='#9ca3af'
				/>
			</View>

			{isLoading && !refreshing ? (
				<View className='flex-1 items-center justify-center'>
					<ActivityIndicator animating={true} size='large' color='#3b82f6' />
				</View>
			) : (
				<FlatList
					data={filteredCategories}
					numColumns={2}
					columnWrapperStyle={{ justifyContent: 'space-between' }}
					contentContainerStyle={{ padding: 16 }}
					keyExtractor={item => item.$id}
					renderItem={({ item }) => (
						<CategoryTile
							key={item.$id}
							category={item}
							onPress={() => !item.is_child && setParentCategoryId(item.$id)}
						/>
					)}
					ListEmptyComponent={
						<Card className='mt-8 mx-4'>
							<Card.Content className='items-center py-8'>
								<MaterialIcons name='inbox' size={48} color='#9ca3af' />
								<Text className='text-gray-500 mt-4 text-center'>
									{searchQuery
										? 'Ничего не найдено. Попробуйте изменить запрос.'
										: 'Категории отсутствуют.'}
								</Text>
							</Card.Content>
						</Card>
					}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
							colors={['#3b82f6']}
							tintColor='#3b82f6'
						/>
					}
				/>
			)}
		</SafeAreaView>
	)
}

export default Category
