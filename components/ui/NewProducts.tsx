import { IProductAW } from '@/types/appwrite.interface'
import { FC } from 'react'
import { FlatList } from 'react-native'
import { ProductItem } from './ProductItem'

interface NewProductsProps {
	products: IProductAW[]
}

const NewProducts: FC<NewProductsProps> = ({ products }) => {
	return (
		<FlatList
			data={products}
			horizontal
			keyExtractor={item => item.$id}
			renderItem={({ item }) => <ProductItem product={item} />}
			// onViewableItemsChanged={viewableItemsChanged}
			// viewabilityConfig={{
			// 	itemVisiblePercentThreshold: 70,
			// }}
		/>
	)
}

export default NewProducts
