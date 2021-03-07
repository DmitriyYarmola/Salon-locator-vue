export const getFromLocalStorage = name => {
	const item = localStorage.getItem(name)
	if (item) return JSON.parse(item)
	return null
}
