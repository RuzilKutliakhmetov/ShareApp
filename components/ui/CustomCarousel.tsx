import React, { FC, useRef } from 'react'
import { Image, View } from 'react-native'
import {
	Extrapolation,
	interpolate,
	useSharedValue,
} from 'react-native-reanimated'
import Carousel, {
	ICarouselInstance,
	Pagination,
} from 'react-native-reanimated-carousel'

interface CustomCarouselProps {
	width: number
	data: string[]
}

const CustomCarousel: FC<CustomCarouselProps> = ({ data, width }) => {
	const ref = useRef<ICarouselInstance>(null)
	const progress = useSharedValue<number>(0)
	const onPressPagination = (index: number) => {
		ref.current?.scrollTo({
			count: index - progress.value,
			animated: true,
		})
	}
	return (
		<View>
			<Carousel
				ref={ref}
				width={(width / 9) * 4}
				height={width / 3}
				data={data}
				onProgressChange={progress}
				renderItem={item => (
					<Image
						source={{ uri: item.item }}
						className='w-full h-full rounded-t-lg'
						resizeMode='cover'
					/>
				)}
			/>

			<Pagination.Custom<{ color: string }>
				progress={progress}
				data={data.map(color => ({ color }))}
				size={6}
				dotStyle={{
					borderRadius: 16,
					backgroundColor: '#c3c6c9ff',
				}}
				activeDotStyle={{
					borderRadius: 16,
					width: 8,
					height: 8,
					overflow: 'hidden',
					backgroundColor: '#727980',
				}}
				containerStyle={{
					gap: 5,
					marginTop: 3,
					marginBottom: 3,
					alignItems: 'center',
					height: 10,
				}}
				horizontal
				onPress={onPressPagination}
				customReanimatedStyle={(progress, index, length) => {
					let val = Math.abs(progress - index)
					if (index === 0 && progress > length - 1) {
						val = Math.abs(progress - length)
					}

					return {
						transform: [
							{
								translateY: interpolate(
									val,
									[0, 1],
									[0, 0],
									Extrapolation.CLAMP
								),
							},
						],
					}
				}}
			/>
		</View>
	)
}

export default CustomCarousel
