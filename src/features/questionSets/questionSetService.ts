import { splitApi } from '../../store/query/splitApi'
import { IAudio, IQuestionSet, IQuestionSetPayload } from './questionSetTypes'

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
                questionSet: IQuestionSetPayload
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
    }),
})

export const {
    useGetChapterQuery,
    useGetQuestionSetQuery,
    useAddAudioMutation,
    useAddQuestionSetMutation,
} = questionSetApi
