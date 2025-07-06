import EmptyState from '@/components/EmptyState'
import Header from '@/components/Header'
import { ProductItem } from '@/components/ui/ProductItem'
import { useGlobalContext } from '@/providers/auth/GlobalProvider'
import { IProductAW } from '@/types/appwrite.interface'
import React, { FC, useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Saved: FC = () => {
	const { user } = useGlobalContext()
	const [savedProducts, setSavedProducts] = useState<IProductAW[] | null>(null)

	useEffect(() => {
		console.log(user)
		if (user) setSavedProducts(user.saved_products)
		else setSavedProducts([])
	}, [user])

	return (
		<SafeAreaView className='bg-backgroundPrimary'>
			<FlatList
				data={savedProducts}
				keyExtractor={item => item.$id}
				renderItem={({ item }) => <ProductItem product={item} />}
				// refreshControl={
				// 	<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				// }
				ListEmptyComponent={() => (
					<EmptyState
						title='Товары не найдены'
						subtitle='Добавьте товары в избранное'
					/>
				)}
				ListHeaderComponent={() => <Header title='Избранное' />}
			/>
		</SafeAreaView>
	)
}

export default Saved
