import { API, apiUrls } from '@/api'
import {
	getFromLocalStorage,
	getFromSessionStorage,
	setAuthData,
	validationErrors,
} from '@/lib'
import * as types from './auth.types'

const getTokenAndSetAuth = async (url, payload, context, resolve, reject) => {
	const { isCode, ...rest } = payload
	try {
		const { data } = await API().post(url, rest)
		const token = data.access_token
		const refreshToken = data.refresh_token
		const isTwoFactorAuthenticationEnabled = data.isTwoFactorAuthenticationEnabled
		if (
			(!isCode && !isTwoFactorAuthenticationEnabled) ||
			(isCode && isTwoFactorAuthenticationEnabled)
		) {
			setAuthData(token, refreshToken, Boolean(payload.isRemember), true)
			const authData = {
				token,
				isRemember: payload.isRemember,
				isAuth: true,
				isActive2FA: isTwoFactorAuthenticationEnabled,
				refreshToken,
			}
			context.commit(types.SET_AUTH, authData)
			context.commit(types.SET_ERROR, '')
			resolve({ isAuth: true })
		} else if (isTwoFactorAuthenticationEnabled && !isCode) {
			context.commit(types.SET_ERROR, '')
			context.commit(types.TOGGLE_ACTIVE_2_FA, true)
			context.commit(types.SHOW_2_FA_FORM, true)
			const authData = {
				isRemember: payload.isRemember,
				token,
			}
			context.commit(types.SET_AUTH, authData)
			setAuthData(token, refreshToken, Boolean(payload.isRemember), false)
			context.commit(types.TOGGLE_LOADING, false)
			resolve({ isAuth: false })
		}
	} catch (error) {
		const errorMessage = isCode
			? validationErrors.invalidGoogleCode
			: validationErrors.invalidCredentials
		context.commit(types.SET_ERROR, errorMessage)
		context.commit(types.TOGGLE_LOADING, false)
		reject()
	}
}

export const actions = {
	getToken: (context, payload) => {
		return new Promise((resolve, reject) => {
			context.commit(types.TOGGLE_LOADING, true)
			getTokenAndSetAuth(apiUrls.login, payload, context, resolve, reject)
		})
	},
	getRefreshToken: ({ commit }, payload) => {
		commit(types.TOGGLE_LOADING, true)
		try {
			return new Promise(resolve => {
				const { data } = API(payload.token).post(apiUrls.refreshToken, {})
				const token = data.access_token
				const refreshToken = data.refresh_token
				if (token && refreshToken) {
					const isRemember =
						getFromLocalStorage('isRemember') || getFromSessionStorage('isRemember')
					setAuthData(token, refreshToken, isRemember, true)
					const authData = { isActive2FA: payload.isActive2FA }
					commit(types.SET_AUTH, authData)
				}
				commit(types.TOGGLE_LOADING, false)
				resolve()
			})
		} catch (error) {
			commit(types.TOGGLE_LOADING, false)
		}
	},
	sendGoogleCode: (context, payload) => {
		console.log(payload)
		return new Promise((resolve, reject) => {
			context.commit(types.TOGGLE_LOADING, true)
			getTokenAndSetAuth(apiUrls.sendGoogle2FACode, payload, context, resolve, reject)
		})
	},
	// getUserProfile: context => {
	// 	context.commit(types.TOGGLE_LOADING, true)
	// 	try {
	// 		const { data } = API().get(apiUrls.userProfile, {})
	// 		const authData = { isActive2FA: data.isTwoFactorAuthenticationEnabled }
	// 		context.commit(types.SET_AUTH, authData)
	// 		context.commit(types.SET_USER_PROFILE, data)
	// 		context.commit(types.TOGGLE_LOADING, false)
	// 	} catch (error) {
	// 		context.commit(types.TOGGLE_LOADING, false)
	// 		console.log(error)
	// 	}
	// },
	// getTwoFactorAuthenticationCode: (context, payload) => {
	// 	context.commit(types.TOGGLE_LOADING, true)
	// 	try {
	// 		const { data } = API().get(apiUrls.twoFactorAuthCode, {})
	// 		const authData = { isActive2FA: payload.isActive2FA }
	// 		context.commit(types.SET_AUTH, authData)
	// 		context.commit(types.SET_TWO_FACTOR_AUTH_CODE, data)
	// 		context.commit(types.TOGGLE_LOADING, false)
	// 	} catch (error) {
	// 		context.commit(types.TOGGLE_LOADING, false)
	// 		console.log(error)
	// 	}
	// },
	// sendTwoFactorAuthenticationCode: async (context, payload) => {
	// 	const { twoFactorAuthenticationCode, base64 } = payload
	// 	try {
	// 		const response = API().post(apiUrls.sendTwoFactorAuthCode, {
	// 			twoFactorAuthenticationCode,
	// 			base64,
	// 		})
	// 		if (response.status === 201) {
	// 			context.commit(types.SET_ERROR, '')
	// 			context.commit(types.TOGGLE_ACTIVE_2_FA, true)
	// 			await context.dispatch('getRefreshToken', {
	// 				token: getFromLocalStorage('token') || getFromSessionStorage('token'),
	// 				isActive2FA: true,
	// 			})
	// 		}
	// 	} catch (error) {
	// 		context.commit(types.SET_ERROR, 'The code is invalid')
	// 		console.log(error)
	// 	}
	// },
	// disabledTwoFactorAuthenticationSaga: async context => {
	// 	try {
	// 		const response = API().post(apiUrls.disabled2FA, {})
	//
	// 		if (response.status === 201) {
	// 			context.commit(types.TOGGLE_ACTIVE_2_FA, true)
	// 			await context.dispatch('getRefreshToken', {
	// 				token: getFromLocalStorage('token') || getFromSessionStorage('token'),
	// 				isActive2FA: false,
	// 			})
	// 		}
	// 	} catch (error) {
	// 		console.log(error)
	// 	}
	// },
}
