import { Dispatch, SetStateAction } from 'react'

import { IUser } from '@/types/user.interface'

export type TypeUserState = IUser | null

export interface IContext {
	user: TypeUserState
	setUser: Dispatch<SetStateAction<TypeUserState>>
	isLoggedIn: boolean
	setIsLoggedIn: Dispatch<SetStateAction<boolean>>
	isLoading: boolean
	setIsLoading: Dispatch<SetStateAction<boolean>>
	refreshUser: () => Promise<void> // Добавляем новую функцию
}
