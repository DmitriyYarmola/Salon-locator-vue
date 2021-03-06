import { mutations } from './auth.mutations'
import { state } from './auth.state'
import { getters } from './auth.getters'
import { actions } from './auth.actions'
import * as authTypes from './auth.types'

export const authModule = {
	state,
	mutations,
	getters,
	actions,
}

export { authTypes }
