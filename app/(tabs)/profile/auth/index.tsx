import SignInForm from '@/components/auth/SignInForm'
import SignUpForm from '@/components/auth/SignUpForm'
import CustomButton from '@/components/ui/buttons/CustomButton'
import Loader from '@/components/ui/Loader'
import { images } from '@/constants/images'
import { signIn, signUp } from '@/lib/appwrite.user'
import { useGlobalContext } from '@/providers/GlobalProvider'
import { IAuthFormData } from '@/types/auth.interface'
import { router } from 'expo-router'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
	Alert,
	ImageBackground,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Auth: FC = () => {
	const { isLoading, setUser, isLoggedIn, setIsLoggedIn } = useGlobalContext()

	const [isSubmitting, setSubmitting] = useState<boolean>(false)
	const [isReg, setIsReg] = useState<boolean>(false)
	const [userNotFound, setUserNotFound] = useState<boolean>(false)
	const { handleSubmit, reset, control } = useForm<IAuthFormData>({
		mode: 'onChange',
	})

	const onSubmit: SubmitHandler<IAuthFormData> = async data => {
		setSubmitting(true)
		try {
			let result
			if (isReg) result = await signUp(data)
			else result = await signIn(data)
			console.log(result)
			if (result) {
				setUser(result)
				setIsLoggedIn(true)
				router.replace('/(tabs)/profile')
			} else {
				setUserNotFound(true)
			}
		} catch (error) {
			Alert.alert('Error', error as string)
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<ImageBackground resizeMode='cover' source={images.bg}>
			<SafeAreaView className='px-2 items-center justify-center h-full w-full'>
				<View className='w-4/5 p-4 rounded-2xl bg-white/10 backdrop-blur'>
					<Text className='text-center text-black text-3xl font-medium mb-8'>
						{isReg ? 'Регистрация' : 'Войти'}
					</Text>
					{isLoading ? (
						<Loader isLoading={isLoading} />
					) : (
						<>
							{isReg ? (
								<SignUpForm control={control} />
							) : (
								<SignInForm control={control} />
							)}

							{userNotFound ? (
								<Text className='mt-4 text-lg'>Пользователь не найден</Text>
							) : (
								<View></View>
							)}
							<CustomButton
								title={isReg ? 'Регистрация' : 'Войти'}
								handlePress={handleSubmit(onSubmit)}
							></CustomButton>
							<View className='flex flex-row justify-center items-center mt-4'>
								<Text className='text-black text-center'>
									{isReg ? 'Уже есть аккаунт? ' : 'Нет аккаунта? '}
								</Text>
								<TouchableOpacity
									onPress={() => {
										setIsReg(!isReg)
										reset()
									}}
								>
									<Text className='text-third'>
										{isReg ? 'Войти' : 'Зарегистрироваться'}
									</Text>
								</TouchableOpacity>
							</View>
							{/* 
							<TouchableOpacity onPress={() => setIsReg(!isReg)}>
								<Text className='text-black text-center text-base mt-6'>
									{isReg ? 'Уже есть аккаунт? ' : 'Нет аккаунта? '}
									<Text className='text-third'>
										{isReg ? 'Войти' : 'Зарегистрироваться'}
									</Text>
								</Text>
							</TouchableOpacity> */}
						</>
					)}
				</View>
			</SafeAreaView>
		</ImageBackground>
	)
}

export default Auth
