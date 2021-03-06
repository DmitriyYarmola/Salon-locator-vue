import * as types from './auth.types'

export const mutations = {
	[types.TOGGLE_LOADING](state, payload) {
		state.isLoading = payload
	},
	[types.SET_ERROR](state, payload) {
		state.error = payload
	},
	[types.SET_AUTH](state, payload) {
		state = { ...state, ...payload }
	},
	[types.SET_USER_PROFILE](state, payload) {
		state.user = payload
	},
	[types.SET_TWO_FACTOR_AUTH_CODE](state, payload) {
		state.google2FACode = payload
	},
	[types.TOGGLE_ACTIVE_2_FA](state, payload) {
		state.isActive2FA = payload
	},
	[types.SHOW_2_FA_FORM](state, payload) {
		state.isShow2FAForm = payload
	},
	// onClearAuthInformation(state) {
	// 	state = {
	// 		...state,
	// 		token: '',
	// 		expirationDate: null,
	// 		email: '',
	// 		isRemember: false,
	// 		error: '',
	// 		isAuth: false,
	// 		isActive2FA: false,
	// 		isShow2FAForm: false,
	// 		google2FACode: null,
	// 		isLoading: false,
	// 	}
	// },
}
