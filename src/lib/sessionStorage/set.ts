export const setToSessionStorage = <T>(name: string, item: T) => {
	sessionStorage.setItem(name, JSON.stringify(item))
}
