export const getFromLocalStorage = (name: string) => {
	const item = localStorage.getItem(name)
	if (item) return JSON.parse(item)
	return null
}
