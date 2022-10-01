import { splitApi } from '../../store/query/splitApi'
import { IUser } from './userTypes'
import userStorage from './userStorage'

interface LoginRes {
    token: string
    user: IUser
}

export const userApi = splitApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<LoginRes, { username: string; password: string }>(
            {
                query: (arg) => ({
                    url: '/users/login/admin',
                    method: 'POST',
                    body: arg,
                }),
                async onQueryStarted(_, { queryFulfilled }) {
                    const { data } = await queryFulfilled
                    userStorage.setUserInfo(
                        data.token,
                        data.user.username,
                        data.user.role
                    )
                },
            }
        ),
    }),
})

export const { useLoginMutation } = userApi
