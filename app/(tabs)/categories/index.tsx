import Header from '@/components/Header'
import { CategoryItem } from '@/components/ui/CategoryItem'
import { getCategories } from '@/lib/appwrite.category'
import useAppwrite from '@/lib/useAppwrite'
import React, { FC, useState } from 'react'
import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Category: FC = () => {
	const [parentCategoryId, setParentCategoryId] = useState(null)
	const { data: posts, refetch } = useAppwrite(() =>
		getCategories(parentCategoryId)
	)
	return (
		<SafeAreaView className='bg-backgroundPrimary'>
			<FlatList
				data={posts}
				numColumns={2}
				keyExtractor={item => item.$id}
				renderItem={({ item }) => (
					<CategoryItem key={item.$id} category={item}></CategoryItem>
				)}
				ListHeaderComponent={() => <Header title='Категории' />}
			/>
		</SafeAreaView>
	)
}

export default Category
