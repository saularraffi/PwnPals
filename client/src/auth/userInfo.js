import cookies from 'js-cookie';

export function isLoggedIn() {
    if (cookies.get('connect.sid')) {
        return true
    }
    // if (localStorage.getItem('loggedIn') === 'true') {
    //     return true
    // }
    else {
        return false
    }
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

// export function setLoggedInStatus(status) {
//     localStorage.setItem('loggedIn', status)
// }

export function logOut() {
    cookies.remove('connect.sid')
    localStorage.removeItem('username')
    localStorage.removeItem('userId')
}