import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, ImageBackground, Text, View } from 'react-native'

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarItemStyle: {
					width: '100%',
					height: '100%',
					justifyContent: 'center',
					alignItems: 'center',
				},
				tabBarStyle: {
					backgroundColor: '#0f0D23',
					borderRadius: 50,
					marginHorizontal: 20,
					marginBottom: 12,
					height: 52,
					position: 'absolute',
					overflow: 'hidden',
					borderWidth: 0,
					borderColor: '#0f0d23',
				},
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name='home'
				options={{
					title: 'Home',
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} icon={icons.home} title='' />
					),
				}}
			/>
			<Tabs.Screen
				name='categories'
				options={{
					title: 'Category',
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} icon={icons.category} title='' />
					),
				}}
			/>
			<Tabs.Screen
				name='saved'
				options={{
					title: 'Saved',
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} icon={icons.save} title='' />
					),
				}}
			/>
			<Tabs.Screen
				name='profile'
				options={{
					title: 'Profile',
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} icon={icons.person} title='' />
					),
				}}
			/>
		</Tabs>
	)
}

const TabIcon = ({ focused, icon, title }: ITabIconProps) => {
	if (focused)
		return (
			<ImageBackground
				source={images.highlight}
				className='flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden'
			>
				<Image source={icon} tintColor='#151312' className='size-5' />
				<Text className='text-secondary text-base font-semibold ml-2'>
					{title}
				</Text>
			</ImageBackground>
		)
	else
		return (
			<View className='size-full justify-center items-center mt-4 rounded-full'>
				<Image source={icon} tintColor='#A8B5DB' className='size-5' />
			</View>
		)
}
