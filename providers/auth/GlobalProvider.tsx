import {
	FC,
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react'

import { getCurrentUser } from '@/lib/appwrite.users'
import { IUser } from '@/types/user.interface'
import { IContext, TypeUserState } from './global-provider.interface'

export const GlobalContext = createContext({} as IContext)
export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
	const [user, setUser] = useState<TypeUserState>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		getCurrentUser()
			.then(response => {
				if (response) {
					const currentUser = response as IUser
					setIsLoggedIn(true)
					setUser(currentUser)
				} else {
					setIsLoggedIn(false)
					setUser(null)
				}
			})
			.catch(error => {
				console.log(error)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [])

	return (
		<GlobalContext.Provider
			value={{ isLoggedIn, setIsLoggedIn, user, setUser, isLoading }}
		>
			{children}
		</GlobalContext.Provider>
	)
}

export default GlobalProvider
