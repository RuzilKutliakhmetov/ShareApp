import { useEffect, useState } from 'react'
import { Alert } from 'react-native'

const useAppwrite = <T>(fn: () => Promise<T>) => {
	const [data, setData] = useState<T | null>(null)
	const [isLoading, setLoading] = useState<boolean>(true)

	const fetchData = async () => {
		setLoading(true)
		try {
			const res = await fn()
			setData(res)
		} catch (error: any) {
			Alert.alert('Error', error.message)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	const refetch = () => fetchData()

	return {
		data,
		isLoading,
		refetch,
	} as const
}

export default useAppwrite
