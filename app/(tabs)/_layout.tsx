import { icons } from '@/constants/icons'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, ImageSourcePropType, View } from 'react-native'

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name='home'
				options={{
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} icon={icons.home} title='' />
					),
				}}
			/>
			<Tabs.Screen
				name='categories'
				options={{
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} icon={icons.category} title='' />
					),
				}}
			/>
			<Tabs.Screen
				name='saved'
				options={{
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} icon={icons.save} title='' />
					),
				}}
			/>
			<Tabs.Screen
				name='profile'
				options={{
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} icon={icons.person} title='' />
					),
				}}
			/>
		</Tabs>
	)
}

interface ITabIconProps {
	focused: boolean
	icon: ImageSourcePropType | undefined
	title: string
}

const TabIcon = ({ focused, icon, title }: ITabIconProps) => {
	if (focused)
		return (
			<View>
				<Image source={icon} tintColor='#151312' />
			</View>
		)
	else
		return (
			<View>
				<Image source={icon} tintColor='#A8B5DB' />
			</View>
		)
}
