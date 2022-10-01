import { splitApi } from '../../store/query/splitApi'
import type { ISection } from './contentTypes'

export const contentApi = splitApi.injectEndpoints({
    endpoints: (build) => ({
        getBookContent: build.query<ISection[], string>({
            query: (bookId) => `books/${bookId}/contents`,
            transformResponse: (res: { sections: ISection[] }) => res.sections,
            keepUnusedDataFor: 300,
        }),
    }),
})

export const { useGetBookContentQuery } = contentApi

export const selectContentByBook = (bookId: string) => {
    return contentApi.endpoints.getBookContent.select(bookId)
}
