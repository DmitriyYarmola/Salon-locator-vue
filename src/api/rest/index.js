import { createInstance } from '../api'

export const API = (refreshToken, googleMaps) => {
	return {
		post: (url, payload, options) => {
			return createInstance(refreshToken, googleMaps).post(url, payload, options)
		},
		get: (url, options) => {
			return createInstance(refreshToken, googleMaps).get(url, options)
		},
		put: (url, payload) => {
			return createInstance(refreshToken, googleMaps).put(url, payload)
		},
		delete: url => {
			return createInstance().delete(url)
		},
	}
}
