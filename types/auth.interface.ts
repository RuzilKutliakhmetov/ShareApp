import { IUser } from './user.interface'

export interface IAuthFormData
	extends Pick<IUser, 'email' | 'password' | 'username' | 'phone'> {
	confirm_password: string
}
