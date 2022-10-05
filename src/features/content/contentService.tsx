import { splitApi } from '../../store/query/splitApi'
import type { ISection } from './contentTypes'

export const contentApi = splitApi.injectEndpoints({
    endpoints: (build) => ({
        getBookContent: build.query<ISection[], string>({
            query: (bookId) => `books/${bookId}/contents`,
            transformResponse: (res: { sections: ISection[] }) => res.sections,
            keepUnusedDataFor: 300,
            providesTags: ['Content'],
        }),
        addSection: build.mutation<void, { bookId: string; title: string }>({
            query: ({ bookId, title }) => ({
                url: `sections`,
                method: 'POST',
                body: { bookId, title },
            }),
            invalidatesTags: ['Content'],
        }),
        updateSection: build.mutation<
            void,
            { sectionId: string; title: string }
        >({
            query: ({ sectionId, title }) => ({
                url: `sections/${sectionId}`,
                method: 'PATCH',
                body: { title },
            }),
            invalidatesTags: ['Content'],
        }),
        addChapter: build.mutation<
            void,
            { sectionId: string; title: string; desc?: string }
        >({
            query: (args) => ({
                url: `chapters`,
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ['Content'],
        }),
        updateChapter: build.mutation<
            void,
            { chapterId: string; title?: string; desc?: string }
        >({
            query: ({ chapterId, title, desc }) => ({
                url: `chapters/${chapterId}`,
                method: 'PATCH',
                body: { title, desc },
            }),
            invalidatesTags: ['Content', 'Chapter'],
        }),
    }),
})

export const {
    useGetBookContentQuery,
    useUpdateSectionMutation,
    useUpdateChapterMutation,
    useAddSectionMutation,
    useAddChapterMutation,
} = contentApi

export const selectContentByBook = (bookId: string) => {
    return contentApi.endpoints.getBookContent.select(bookId)
}
