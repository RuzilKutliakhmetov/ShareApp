import { FC } from 'react'
import { Control } from 'react-hook-form'

import Field from '@/components/ui/Field'

import { validEmail } from '@/helper/email.regex'
import { IAuthFormData } from '@/types/auth.interface'

interface IAuthFields {
	control: Control<IAuthFormData>
	isPassRequired?: boolean
}

const SignInFields: FC<IAuthFields> = ({ control, isPassRequired }) => {
	return (
		<>
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
						value: 6,
						message: 'Пароль должен составлять не менее 6 символов',
					},
				}}
			/>
		</>
	)
}

export default SignInFields
