import { icons } from '@/constants/icons'
import { useNavigation } from 'expo-router'
import { Image, TouchableOpacity } from 'react-native'

export default function BackButton() {
	const navigation = useNavigation()

	const handlePress = () => {
		navigation.goBack()
	}
	return (
		<TouchableOpacity
			className='flex justify-center items-center bg-slate-300 w-14 h-14 rounded-xl'
			onPress={handlePress}
		>
			<Image
				source={icons.arrow}
				className='w-14 h-14 -rotate-90 p-2'
				resizeMode='contain'
			/>
		</TouchableOpacity>
	)
}
