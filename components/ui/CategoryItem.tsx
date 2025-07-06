import { ICategoryAW } from '@/types/appwrite.interface'
import { Link } from 'expo-router'
import React, { FC } from 'react'
import { Pressable, Text, View } from 'react-native'

interface CategoryItemProps {
	category: ICategoryAW
}

export const CategoryItem: FC<CategoryItemProps> = ({ category }) => {
	return (
		<Pressable
			className={`flex flex-col items-start justify-between p-4 rounded-lg shadow-md bg-third border-2 border-primary overflow-hidden`}
		>
			<View className='flex flex-col items-start gap-2'>
				<Link
					href={
						category.is_child
							? { pathname: '/(tabs)/home/search' }
							: {
									pathname: '/(tabs)/categories/category/[categoryItem]',
									params: { categoryItem: JSON.stringify(category) },
							  }
					}
				>
					<Text className='text-xl font-bold text-white leading-tight'>
						{category.name}
					</Text>
				</Link>
			</View>
		</Pressable>
	)
}
