import Header from '@/components/Header'
import BackButton from '@/components/ui/BackButton'
import { CategoryItem } from '@/components/ui/CategoryItem'
import { ProductItem } from '@/components/ui/ProductItem'
import SearchInput from '@/components/ui/SearchInput'
import { getCategories } from '@/lib/appwrite.category'
import { getProductsByParentCategory } from '@/lib/appwrite.product'
import useAppwrite from '@/lib/useAppwrite'
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
								<CategoryItem key={item.$id} category={item} />
							)}
						/>
					</View>
				)}
				renderItem={({ item }) => <ProductItem key={item.$id} product={item} />}
			/>
		</SafeAreaView>
	)
}
