import { splitApi } from '../../store/query/splitApi'
import { IAudio, IQuestionSet, AddQuestionSetPayload } from './questionSetTypes'

interface ChapterInfo {
    id: string
    title: string
    desc?: string
    questionSets: string[]
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
        addQuestionSet: build.mutation<
            void,
            {
                chapterId: string
                questionSet: AddQuestionSetPayload
            }
        >({
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
                // * 不能包含 chapters 字段
                const { id, chapters, ...rest } = questionSet
                return {
                    url: `questionSets/${id}`,
                    method: 'PATCH',
                    body: { questionSet: rest },
                }
            },

            invalidatesTags: ['QuestionSet'],
        }),
    }),
})

export const {
    useGetChapterInfoQuery,
    useGetQuestionSetQuery,
    useAddAudioMutation,
    useAddQuestionSetMutation,
    useUpdateQuestionSetMutation,
} = questionSetApi
