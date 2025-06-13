import { Stack } from 'expo-router'

const HomeLayout = () => {
	return (
		<Stack>
			<Stack.Screen
				name='index'
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name='search'
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name='product/[id]'
				options={{
					headerShown: false,
				}}
			/>
		</Stack>
	)
}

export default HomeLayout
