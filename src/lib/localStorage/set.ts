export const setToLocalStorage = <T>(name: string, item: T) => {
	localStorage.setItem(name, JSON.stringify(item))
}
