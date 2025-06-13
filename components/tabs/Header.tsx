import { FC } from 'react'
import { Text, View } from 'react-native'

interface HeaderProps {
	title: string
}

const Header: FC<HeaderProps> = ({ title }) => {
	return (
		<View className='flex items-start mt-2'>
			<Text className='color-primary font-semibold text-2xl'>{title}</Text>
		</View>
	)
}

export default Header
