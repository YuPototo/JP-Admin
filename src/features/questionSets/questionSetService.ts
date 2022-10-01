import { splitApi } from '../../store/query/splitApi'
import { IQuestionSet } from './questionSetTypes'

interface ChapterInfo {
    id: string
    title: string
    desc?: string
    questionSets: string[]
}

export const questionSetApi = splitApi.injectEndpoints({
    endpoints: (build) => ({
        getChapter: build.query<ChapterInfo, string>({
            query: (chapterId) => `chapters/${chapterId}`,
            transformResponse: (res: { chapter: ChapterInfo }) => res.chapter,
            keepUnusedDataFor: 300,
            providesTags: ['Chapter'],
        }),
        getQuestionSet: build.query<IQuestionSet, string>({
            query: (questionSetId) => `questionSets/${questionSetId}`,
            transformResponse: (res: { questionSet: IQuestionSet }) =>
                res.questionSet,
            keepUnusedDataFor: 300,
        }),
    }),
})

export const { useGetChapterQuery, useGetQuestionSetQuery } = questionSetApi
