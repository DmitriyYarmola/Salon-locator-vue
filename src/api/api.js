import axios from 'axios'
import { setAuthData, getFromSessionStorage, getFromLocalStorage } from '@/lib'
import { apiUrls } from '@/api/urls'
export const createInstance = (refreshToken, googleMaps) => {
	const token = getFromLocalStorage('token') || getFromSessionStorage('token')
	let headers = {}
	if (refreshToken) headers = { Authorization: `Bearer ${refreshToken}` }
	else if (token && !googleMaps)
		headers = {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		}

	const instance = axios.create({
		baseURL: googleMaps
			? 'https://maps.googleapis.com/maps/api/geocode/'
			: process.env.VUE_APP_BASE_URL || 'https://api.salonlocator.stage.redentu.com',
		headers,
	})

	instance.interceptors.response.use(
		response => response,
		async error => {
			const originalConfig = error.config
			if (
				error.response.status === 401 &&
				document.location.pathname !== '/auth/login' &&
				!originalConfig._retry
			) {
				originalConfig._retry = true
				const verifyToken =
					getFromLocalStorage('refreshToken') || getFromSessionStorage('refreshToken')
				const { data } = await createInstance(verifyToken).post(apiUrls.refreshToken)
				const token = data.access_token
				const refreshToken = data.refresh_token
				if (token && refreshToken) {
					const isRemember =
						getFromLocalStorage('isRemember') || getFromSessionStorage('isRemember')
					setAuthData(token, refreshToken, isRemember, true)
				}
				originalConfig.headers['Authorization'] = 'Bearer ' + token
				return instance(originalConfig)
			}
		}
	)

	return instance
}
