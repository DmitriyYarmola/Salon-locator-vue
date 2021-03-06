import { setToLocalStorage } from './LocalStorage'
import { setToSessionStorage } from './SessionStorage'

export const setAuthData = (token, refreshToken, expirationDate, isRemember, isAuth) => {
	if (isRemember) {
		setToLocalStorage('expiration', expirationDate)
		setToLocalStorage('token', token)
		setToLocalStorage('refreshToken', refreshToken)
		setToLocalStorage('isRemember', isRemember)
		setToLocalStorage('isAuth', isAuth)
	} else {
		setToSessionStorage('expiration', expirationDate)
		setToSessionStorage('token', token)
		setToSessionStorage('refreshToken', refreshToken)
		setToSessionStorage('isRemember', isRemember)
		setToSessionStorage('isAuth', isAuth)
	}
}
