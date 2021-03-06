export const requiredField = (value: string): null | string => {
	if (!value) return `Це поле є обов'язковим`
	return null
}
