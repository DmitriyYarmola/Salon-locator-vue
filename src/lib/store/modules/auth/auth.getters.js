export const getters = {
	isLoading: state => state.isLoading,

	isAuth: state => state.isAuth,

	error: state => state.error,

	user: state => state.user,

	google2FACode: state => state.google2FACode,

	isActive2FA: state => state.isActive2FA,

	isShow2FAForm: state => state.isShow2FAForm,

	isRemember: state => state.isRemember,
}
