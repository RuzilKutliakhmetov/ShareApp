import { Text, View } from 'react-native'
import { Button } from 'react-native-paper'

export default function Index() {
	return (
		<View>
			<Text className='mt-2'>Edit app/index.tsx to edit this screen.</Text>
			<Button
				className='mx-2'
				icon='camera'
				mode='contained'
				onPress={() => console.log('Pressed')}
			>
				Press me
			</Button>
		</View>
	)
}
