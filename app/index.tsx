import { Redirect } from 'expo-router'
import React, { FC } from 'react'

const StartPage: FC = () => {
	return <Redirect href='./(tabs)' />
}

export default StartPage
