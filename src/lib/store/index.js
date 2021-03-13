import { createLogger, createStore } from 'vuex'
import { authModule } from './modules'

const debug = process.env.NODE_ENV !== 'production'

export const store = createStore({
	modules: {
		authModule,
	},
	strict: debug,
	plugins: debug ? [createLogger()] : [],
})
