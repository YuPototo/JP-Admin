import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'
import { userApi } from './userService'
import { Role } from './userTypes'

export interface UserSliceState {
    token: string | null
    username: string | null
    role: Role | null
}

const initialState: UserSliceState = {
    token: null,
    username: null,
    role: null,
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        userLoggedIn: (
            state,
            {
                payload,
            }: PayloadAction<{ token: string; username: string; role: Role }>
        ) => {
            state.token = payload.token
            state.username = payload.username
            state.role = payload.role
        },
        userLoggedOut: (state) => {
            state.token = null
            state.username = null
            state.role = null
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            userApi.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                state.token = payload.token
                state.username = payload.user.username
                state.role = payload.user.role
            }
        )
    },
})

export const { userLoggedIn, userLoggedOut } = userSlice.actions

/* selectors */
export const selectIsLogin = (state: RootState) => {
    return (
        state.user.token !== null &&
        state.user.username !== null &&
        state.user.role !== null
    )
}

export default userSlice.reducer
