export const getFromSessionStorage = (name: string) => {
	const item = sessionStorage.getItem(name)
	if (item) return JSON.parse(item)
	return null
}
