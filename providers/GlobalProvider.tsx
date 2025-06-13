import {
	FC,
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react'

import { getCurrentUser } from '@/lib/appwrite.user'
import { IUser } from '@/types/user.interface'
import { IContext, TypeUserState } from '../types/provider.interface'

export const GlobalContext = createContext({} as IContext)
export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
	const [user, setUser] = useState<TypeUserState>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)

	const refreshUser = async () => {
		try {
			setIsLoading(true)
			const response = await getCurrentUser()
			if (response) {
				const currentUser = response as IUser
				setIsLoggedIn(true)
				setUser(currentUser)
			} else {
				setIsLoggedIn(false)
				setUser(null)
			}
		} catch (error) {
			console.log(error)
			setIsLoggedIn(false)
			setUser(null)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		refreshUser()
	}, [])

	return (
		<GlobalContext.Provider
			value={{
				isLoggedIn,
				setIsLoggedIn,
				user,
				setUser,
				isLoading,
				setIsLoading,
				refreshUser, // Добавляем функцию в контекст
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}

export default GlobalProvider
