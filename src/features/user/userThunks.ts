import { AppThunk } from '../../store/store'
import userStorage from './userStorage'
import { userLoggedIn, userLoggedOut } from './userSlice'

/* thunks */
export const getLocalUserInfo = (): AppThunk => (dispatch) => {
    const result = userStorage.getUserInfo()

    if (result) {
        dispatch(userLoggedIn(result))
    }
}

export const logout = (): AppThunk => (dispatch) => {
    userStorage.removeUserInfo()
    dispatch(userLoggedOut())
}
