import GlobalProvider from '@/providers/GlobalProvider'
import { Stack } from 'expo-router'
import {
	MD3LightTheme as DefaultTheme,
	PaperProvider,
} from 'react-native-paper'
import '../global.css'

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: 'tomato',
		secondary: 'yellow',
	},
}

export default function RootLayout() {
	return (
		<PaperProvider theme={theme}>
			<GlobalProvider>
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name='index' />
					<Stack.Screen name='(tabs)' />
				</Stack>
			</GlobalProvider>
		</PaperProvider>
	)
}
