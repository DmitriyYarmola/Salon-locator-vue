export const setToLocalStorage = (name, item) => {
	localStorage.setItem(name, JSON.stringify(item))
}
