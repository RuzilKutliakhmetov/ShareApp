import { images } from '@/constants/images'
import { router } from 'expo-router'
import { FC } from 'react'
import { Image, Text, View } from 'react-native'
import CustomButton from './ui/CustomButton'

interface EmptyStateProps {
	title: string
	subtitle: string
}

const EmptyState: FC<EmptyStateProps> = ({ title, subtitle }) => {
	return (
		<View className='flex justify-center items-center px-8 gap-4'>
			<Text className='text-xl font-pmedium text-primary mt-8'>{title}</Text>
			<Image
				source={images.empty}
				resizeMode='contain'
				className='w-[270px] h-[216px]'
			/>

			<Text className='text-xl text-center font-psemibold text-primary'>
				{subtitle}
			</Text>

			<CustomButton
				title='Вернутся на главную'
				handlePress={() => router.push('/home')}
				containerStyles='w-full my-5'
			/>
		</View>
	)
}

export default EmptyState
