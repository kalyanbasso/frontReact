export const TOKEN = "credentials";
export const isAuthenticated = () => {
	if(localStorage.getItem(TOKEN))
		return localStorage.getItem(TOKEN)
	else if(sessionStorage.getItem(TOKEN))
		return sessionStorage.getItem(TOKEN)

}
export const getToken = () => {
	return isAuthenticated()
} 
export const login = (token, remember) => {
	if(remember)
		localStorage.setItem(TOKEN, token);
	else
		sessionStorage.setItem(TOKEN, token);
}
export const logout = () => {
	localStorage.removeItem(TOKEN);
	sessionStorage.removeItem(TOKEN);
}
