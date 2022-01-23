import cookies from 'js-cookie'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export function isLoggedIn() {
    if (cookies.get('connect.sid')) {
        return true
    }
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