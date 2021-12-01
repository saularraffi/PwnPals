export function isLoggedIn() {
    return localStorage.getItem('loggedIn')
}

export function getUser() {
    return localStorage.getItem('username')
}

export function setUser(username) {
    localStorage.setItem('username', username)
}

export function getUserId() {
    return localStorage.getItem('userId')
}

export function setUserId(userId) {
    localStorage.setItem('userId', userId)
}

export function setLoggedInStatus(status) {
    localStorage.setItem('loggedIn', status)
}

export function logOut() {
    setLoggedInStatus(false)
    localStorage.removeItem('username')
}