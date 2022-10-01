import { splitApi } from '../../store/query/splitApi'

interface AddMemberRes {
    displayId: string
    memberDaysBefore: number
    memberDaysAfter: number
}

export const memberApi = splitApi.injectEndpoints({
    endpoints: (build) => ({
        addMember: build.mutation<
            AddMemberRes,
            { userDisplayId: string; months: number }
        >({
            query: (arg) => ({
                url: '/users/addMember',
                method: 'POST',
                body: arg,
            }),
        }),
    }),
})

export const { useAddMemberMutation } = memberApi
