import { View } from 'react-native'

import Field from '@/components/ui/Field'
import { IAuthFormData } from '@/types/auth.interface'

import { validEmail } from '@/helper/email.regex'
import { validPhone } from '@/helper/phone.regex'
import { FC } from 'react'
import { Control } from 'react-hook-form'

interface IAuthFields {
	control: Control<IAuthFormData>
	isPassRequired?: boolean
}

const SignUpForm: FC<IAuthFields> = ({ control, isPassRequired }) => {
	return (
		<View>
			<Field<IAuthFormData>
				placeholder='Имя пользователя'
				control={control}
				name='username'
				rules={{
					required: 'Имя пользователя обязательна!',
				}}
			/>
			<Field<IAuthFormData>
				placeholder='Номер телефона'
				control={control}
				name='phone'
				rules={{
					required: 'Номер телефона обязателен!',
					pattern: {
						value: validPhone,
						message: 'Пожалуйста, введите номер телефона корректно',
					},
				}}
				keyboardType='phone-pad'
			/>
			<Field<IAuthFormData>
				placeholder='Почта'
				control={control}
				name='email'
				rules={{
					required: 'Почта обязательна!',
					pattern: {
						value: validEmail,
						message: 'Пожалуйста, введите валидную почту',
					},
				}}
				keyboardType='email-address'
			/>
			<Field<IAuthFormData>
				placeholder='Пароль'
				control={control}
				name='password'
				secureTextEntry
				rules={{
					required: 'Пароль обязателен!',
					minLength: {
						value: 8,
						message: 'Пароль должен составлять не менее 8 символов',
					},
				}}
			/>
		</View>
	)
}

export default SignUpForm
