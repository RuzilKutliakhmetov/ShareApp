import EmptyState from '@/components/EmptyState'
import NewProducts from '@/components/ui/NewProducts'
import { ProductItem } from '@/components/ui/ProductItem'
import { getAllProducts, getLatestProducts } from '@/lib/appwrite.product'
import useAppwrite from '@/lib/useAppwrite'
import { useState } from 'react'
import { FlatList, RefreshControl, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Index() {
	const { data: products, refetch } = useAppwrite(getAllProducts)
	const { data: latestProducts } = useAppwrite(getLatestProducts)

	const [refreshing, setRefreshing] = useState(false)

	const onRefresh = async () => {
		setRefreshing(true)
		await refetch()
		setRefreshing(false)
	}
	return (
		<SafeAreaView className='bg-backgroundPrimary'>
			<FlatList
				data={products}
				keyExtractor={item => item.$id}
				renderItem={({ item }) => <ProductItem product={item} />}
				ListHeaderComponent={() => (
					<View>
						<NewProducts products={latestProducts ?? []} />
					</View>
				)}
				ListEmptyComponent={() => (
					<EmptyState title='Товары не найдены ' subtitle='' />
				)}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			/>
		</SafeAreaView>
	)
}
