import { icons } from '@/constants/icons'
import { useRouter } from 'expo-router'
import { Image, Text, TouchableOpacity } from 'react-native'

const SearchInput = () => {
	const router = useRouter()

	const handlePress = () => {
		router.navigate('/(tabs)/home/search')
	}

	return (
		<TouchableOpacity
			className='flex flex-row items-center bg-slate-300 w-5/6 h-14 px-4 rounded-xl focus:border-secondary'
			onPress={handlePress}
		>
			<Text className='text-base mt-0.5 text-primary flex-1  font-pregular'>
				Поиск
			</Text>

			<Image source={icons.search} className='w-5 h-5' resizeMode='contain' />
		</TouchableOpacity>
	)
}

export default SearchInput
