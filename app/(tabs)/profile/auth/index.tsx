import Button from '@/components/ui/button/Button'
// import Loader from '@/components/ui/Loader'
import Loader from '@/components/ui/Loader'
import { signIn, signUp } from '@/lib/appwrite.users'
import { useGlobalContext } from '@/providers/auth/GlobalProvider'
import { IAuthFormData } from '@/types/auth.interface'
import { router } from 'expo-router'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import SignInFields from './SignInFields'
import SignUpFields from './SignUpFields'

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
			console.log('result - ' + result)
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
		<View className='mx-2 items-center justify-center h-full'>
			<View className='w-9/12'>
				<Text className='text-center text-black text-3xl font-medium mb-8'>
					{isReg ? 'Регистрация' : 'Логин'}
				</Text>
				{isLoading ? (
					<Loader isLoading={isLoading} />
				) : (
					<>
						{isReg ? (
							<SignUpFields control={control} />
						) : (
							<SignInFields control={control} />
						)}

						{userNotFound ? (
							<Text className='mt-4 text-lg'>Пользователь не найден</Text>
						) : (
							<></>
						)}
						<Button onPress={handleSubmit(onSubmit)}>
							{isReg ? 'Регистрация' : 'Войти'}
						</Button>
						<TouchableOpacity onPress={() => setIsReg(!isReg)}>
							<Text className='text-black text-center text-base mt-6'>
								{isReg ? 'Уже есть аккаунт? ' : 'Нет аккаунта? '}
								<Text className='text-third'>
									{isReg ? 'Войти' : 'Зарегистрироваться'}
								</Text>
							</Text>
						</TouchableOpacity>
					</>
				)}
			</View>
		</View>
	)
}

export default Auth
