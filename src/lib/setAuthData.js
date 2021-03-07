import { setToLocalStorage } from './localStorage'
import { setToSessionStorage } from './sessionStorage'

export const setAuthData = (token, refreshToken, isRemember, isAuth) => {
	if (isRemember) {
		setToLocalStorage('token', token)
		setToLocalStorage('refreshToken', refreshToken)
		setToLocalStorage('isRemember', isRemember)
		setToLocalStorage('isAuth', isAuth)
	} else {
		setToSessionStorage('token', token)
		setToSessionStorage('refreshToken', refreshToken)
		setToSessionStorage('isRemember', isRemember)
		setToSessionStorage('isAuth', isAuth)
	}
}
