import GlobalProvider from '@/providers/auth/GlobalProvider'
import { Stack } from 'expo-router'
import './global.css'

export default function RootLayout() {
	return (
		<GlobalProvider>
			<Stack>
				<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
			</Stack>
		</GlobalProvider>
	)
}
