export const getFromSessionStorage = name => {
	const item = sessionStorage.getItem(name)
	if (item) return JSON.parse(item)
	return null
}
