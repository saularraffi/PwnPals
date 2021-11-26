export function isLoggedIn() {
    return localStorage.getItem('loggedIn')
}

export function getUser() {
    return localStorage.getItem('username')
}

export function setLoggedInStatus(status) {
    localStorage.setItem('loggedIn', status)
}

export function setUser(username) {
    localStorage.setItem('username', username)
}

export function logOut() {
    setLoggedInStatus(false)
    localStorage.removeItem('username')
}