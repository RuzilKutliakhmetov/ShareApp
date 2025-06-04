import { Stack } from 'expo-router'

const CategoryLayout = () => {
	return (
		<Stack>
			<Stack.Screen
				name='index'
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name='category/[categoryItem]'
				options={{ headerShown: false }}
			/>
		</Stack>
	)
}

export default CategoryLayout
