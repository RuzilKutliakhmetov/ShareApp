import Header from '@/components/tabs/Header'
import { CategoryTile } from '@/components/ui/tiles/CategoryTile'
import { getCategories } from '@/lib/appwrite.category'
import useAppwrite from '@/lib/hooks/useAppwrite'
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
					<CategoryTile key={item.$id} category={item}></CategoryTile>
				)}
				ListHeaderComponent={() => <Header title='Категории' />}
			/>
		</SafeAreaView>
	)
}

export default Category
