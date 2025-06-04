import Header from '@/components/tabs/Header'
import BackButton from '@/components/ui/buttons/BackButton'
import SearchInput from '@/components/ui/buttons/SearchButton'
import { CategoryTile } from '@/components/ui/tiles/CategoryTile'
import { ProductTile } from '@/components/ui/tiles/ProductTile'
import { getCategories } from '@/lib/appwrite.category'
import { getProductsByParentCategory } from '@/lib/appwrite.product'
import useAppwrite from '@/lib/hooks/useAppwrite'
import { ICategoryAW } from '@/types/appwrite.interface'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { FlatList, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Category() {
	const { categoryItem } = useLocalSearchParams()
	const category: ICategoryAW = JSON.parse(categoryItem as string)

	const { data: categories } = useAppwrite(() =>
		getCategories(category.$id as string)
	)

	const { data: products } = useAppwrite(() =>
		getProductsByParentCategory(category.$id as string)
	)

	return (
		<SafeAreaView className='px-4'>
			<View className='flex flex-row items-center gap-2 py-2'>
				<BackButton />
				<SearchInput />
			</View>

			<FlatList
				className=''
				data={products || []}
				numColumns={2}
				columnWrapperStyle={{ gap: 10 }}
				contentContainerStyle={{ gap: 6 }}
				keyExtractor={item => item.$id}
				ListHeaderComponent={() => (
					<View className=''>
						<Header title='Категории' />
						<FlatList
							className='py-2'
							data={categories || []}
							horizontal={true}
							contentContainerStyle={{ gap: 4 }}
							keyExtractor={item => item.$id}
							renderItem={({ item }) => (
								<CategoryTile key={item.$id} category={item} />
							)}
						/>
					</View>
				)}
				renderItem={({ item }) => <ProductTile key={item.$id} product={item} />}
			/>
		</SafeAreaView>
	)
}
