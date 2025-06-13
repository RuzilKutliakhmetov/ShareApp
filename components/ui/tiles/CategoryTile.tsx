import { ICategoryAW } from '@/types/appwrite.interface'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { FC } from 'react'
import { View } from 'react-native'
import { Card, Text, TouchableRipple, useTheme } from 'react-native-paper'

interface CategoryTileProps {
	category: ICategoryAW
	onPress?: () => void
}

export const CategoryTile: FC<CategoryTileProps> = ({ category, onPress }) => {
	const theme = useTheme()
	const iconName = category.is_child ? 'tag-outline' : 'shape-outline'

	return (
		<View className='w-1/2 p-1'>
			<TouchableRipple onPress={onPress} borderless style={{ borderRadius: 8 }}>
				<Card className='w-full' mode='contained'>
					<Card.Content className='items-center py-4'>
						<MaterialCommunityIcons
							name={iconName}
							size={28}
							color={theme.colors.primary}
						/>
						<Text
							variant='titleMedium'
							className='mt-2 text-center font-bold'
							style={{ color: theme.colors.onSurface }}
							numberOfLines={2}
						>
							{category.name}
						</Text>

						{category.description && (
							<Text
								variant='bodySmall'
								className='text-gray-400 mt-1 text-center'
								numberOfLines={2}
							>
								{category.description}
							</Text>
						)}
					</Card.Content>
				</Card>
			</TouchableRipple>
		</View>
	)
}
