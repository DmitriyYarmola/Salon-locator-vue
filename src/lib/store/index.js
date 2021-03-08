import { createStore } from 'vuex'
import { authModule } from './modules'

export { authTypes } from './modules'
export const store = createStore({
	modules: {
		authModule,
	},
})
