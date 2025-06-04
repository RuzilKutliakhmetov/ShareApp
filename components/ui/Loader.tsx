import { FC } from 'react'
import {
	ActivityIndicator,
	Dimensions,
	Platform,
	View,
	ViewStyle,
} from 'react-native'

interface LoaderProps {
	isLoading: boolean
}

const Loader: FC<LoaderProps> = ({ isLoading }) => {
	const osName = Platform.OS
	const screenHeight = Dimensions.get('screen').height

	if (!isLoading) return null

	const containerStyle: ViewStyle = {
		height: screenHeight,
	}

	return (
		<View
			className='absolute flex justify-center items-center w-full h-full bg-primary/60 z-10'
			style={containerStyle}
		>
			<ActivityIndicator
				animating={isLoading}
				color='#fff'
				size={osName === 'ios' ? 'large' : 50}
			/>
		</View>
	)
}

export default Loader
