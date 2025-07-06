import { getProduct } from '@/lib/appwrite.product'
import useAppwrite from '@/lib/useAppwrite'
import { Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

const ProductDetails = () => {
	const { id } = useLocalSearchParams()

	const {
		data: product,
		refetch,
		loading,
	} = useAppwrite(() => getProduct(id as string))
	return (
		<View>
			<Stack.Screen options={{ headerShown: false }} />
			<Text>{product?.name}</Text>
			<Text>{product?.category.name}</Text>
			<Text>{product?.description}</Text>
			<Text>{product?.price_per_day}</Text>
		</View>
	)
}

export default ProductDetails
