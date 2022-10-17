import { splitApi } from '../../store/query/splitApi'
import {
    IAudio,
    IQuestion,
    IQuestionSet,
    RichTextNode,
} from './questionSetTypes'

interface ChapterInfo {
    id: string
    title: string
    desc?: string
    questionSets: string[]
}

export interface AddQuestionSetPayload {
    chapterId: string
    questionSet: {
        body?: RichTextNode[] // 大题题干
        questions: IQuestion[]
        explanation?: RichTextNode[] // 大题解析
        audio?: IAudio
    }
}

export const questionSetApi = splitApi.injectEndpoints({
    endpoints: (build) => ({
        getChapterInfo: build.query<ChapterInfo, string>({
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
            providesTags: ['QuestionSet'],
        }),
        addAudio: build.mutation<IAudio, FormData>({
            query: (formData) => ({
                url: 'audios',
                method: 'POST',
                body: formData,
            }),
            transformResponse: (res: { audio: IAudio }) => res.audio,
        }),
        addQuestionSet: build.mutation<void, AddQuestionSetPayload>({
            query: ({ chapterId, questionSet }) => ({
                url: 'questionSets',
                method: 'POST',
                body: {
                    chapterId,
                    questionSet,
                },
            }),
            invalidatesTags: ['Chapter'],
        }),
        updateQuestionSet: build.mutation<void, { questionSet: IQuestionSet }>({
            query: ({ questionSet }) => {
                const { id, ...rest } = questionSet
                return {
                    url: `questionSets/${id}`,
                    method: 'PATCH',
                    body: { questionSet: rest },
                }
            },
            invalidatesTags: ['QuestionSet'],
        }),
        uploadQuestionSetImage: build.mutation<{ imageUrl: string }, FormData>({
            query: (formData) => ({
                url: 'questionSets/uploadImage',
                method: 'POST',
                body: formData,
            }),
        }),
    }),
})

export const {
    useGetChapterInfoQuery,
    useGetQuestionSetQuery,
    useAddAudioMutation,
    useAddQuestionSetMutation,
    useUpdateQuestionSetMutation,
    useUploadQuestionSetImageMutation,
} = questionSetApi
