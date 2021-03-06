import { createStore } from 'vuex'
import { authModule } from './modules'

export const store = createStore({
	modules: {
		authModule,
	},
})
