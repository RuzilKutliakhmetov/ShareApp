import { Stack } from 'expo-router'

const SavedLayout = () => {
	return (
		<Stack>
			<Stack.Screen
				name='index'
				options={{
					headerShown: false,
				}}
			/>
		</Stack>
	)
}

export default SavedLayout
