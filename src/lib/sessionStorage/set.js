export const setToSessionStorage = (name, item) => {
	sessionStorage.setItem(name, JSON.stringify(item))
}
