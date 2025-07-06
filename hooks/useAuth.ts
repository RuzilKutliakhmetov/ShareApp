import { GlobalContext } from '@/providers/auth/GlobalProvider'
import { useContext } from 'react'

export const useAuth = () => useContext(GlobalContext)
