import { Role } from './userTypes'

const setUserInfo = (token: string, username: string, userRole: Role) => {
    localStorage.setItem('token', token)
    localStorage.setItem('username', username)
    localStorage.setItem('role', userRole)
}

const getUserInfo = () => {
    const token = localStorage.getItem('token')
    const username = localStorage.getItem('username')
    const role = localStorage.getItem('role') as Role
    if (!token || !username || !role) return
    return { token, username, role }
}

const removeUserInfo = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('role')
}

const userStorage = {
    setUserInfo,
    getUserInfo,
    removeUserInfo,
}

export default userStorage
