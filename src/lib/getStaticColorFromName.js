export const getStaticColorFromName = name => {
	const colors = {
		primary: '#1B78CE',
		secondary: '#1ECE64',
		grey: '#E8E8E8',
		red: '#E12B2B',
		white: '#ffffff',
	}
	return colors[name]
}
