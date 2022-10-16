import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    IAudio,
    INewQuestion,
    RichTextNode,
    IQuestionSet,
    IQuestionSetInEditor,
} from './questionSetTypes'
import type { RootState } from '../../store/store'
import _ from 'lodash'
import { createEmptyEditor } from '../editor/CustomEditor'

export interface QuestionSetEditorState {
    chapterId: null | string
    questionSet: null | IQuestionSetInEditor
    validationError: null | string[]
}

const initialState: QuestionSetEditorState = {
    chapterId: null, // 只在新增题目时需要
    questionSet: null,
    validationError: null,
}

export const emptyQuestion: INewQuestion = {
    body: createEmptyEditor(),
    options: [createEmptyEditor(), createEmptyEditor()],
}

export const questionSetEditorSlice = createSlice({
    name: 'questionSetEditor',
    initialState,
    reducers: {
        chapterUsed: (state, action: PayloadAction<string>) => {
            state.chapterId = action.payload
        },
        questionSetCreated: (state) => {
            state.questionSet = {
                questions: [_.cloneDeep(emptyQuestion)],
            }
        },
        questionSetBodyAdded: (state) => {
            if (!state.questionSet) {
                console.error('questionSetBodyAdded called without questionSet')
                return
            }
            state.questionSet.body = createEmptyEditor()
        },
        questionSetBodyRemoved: (state) => {
            delete state.questionSet?.body
        },
        questionAdded: (state) => {
            if (!state.questionSet) {
                console.error('questionAdded called without questionSet')
                return
            }
            state.questionSet.questions.push(_.cloneDeep(emptyQuestion))
        },
        questionRemove: (state, action: PayloadAction<number>) => {
            if (!state.questionSet) {
                console.error('questionRemove called without questionSet')
                return
            }
            state.questionSet.questions.splice(action.payload, 1)
        },
        questionSetExplanationAdded: (state) => {
            if (!state.questionSet) {
                console.error(
                    'questionSetExplanationAdded called without questionSet'
                )
                return
            }
            state.questionSet.explanation = createEmptyEditor()
        },
        questionSetExplanationRemoved: (state) => {
            delete state.questionSet?.explanation
        },
        questionBodyAdded: (state, action: PayloadAction<number>) => {
            if (!state.questionSet) {
                console.error('questionBodyAdded called without questionSet')
                return
            }
            const index = action.payload
            state.questionSet.questions[index].body = createEmptyEditor()
        },
        questionBodyRemoved: (state, action: PayloadAction<number>) => {
            if (!state.questionSet) {
                console.error('questionBodyRemoved called without questionSet')
                return
            }
            const index = action.payload
            delete state.questionSet.questions[index].body
        },
        optionRemoved: (
            state,
            action: PayloadAction<{
                questionIndex: number
                optionIndex: number
            }>
        ) => {
            if (!state.questionSet) {
                console.error('optionRemoved called without questionSet')
                return
            }
            const { questionIndex, optionIndex } = action.payload
            const question = state.questionSet.questions[questionIndex]

            if (!question) {
                console.error(
                    `optionRemoved called with invalid questionIndex ${questionIndex}`
                )
                return
            }

            question.options.splice(optionIndex, 1)

            if (
                question.answer !== undefined &&
                question.answer >= optionIndex
            ) {
                question.answer--
            }
        },
        optionAdded: (state, action: PayloadAction<number>) => {
            if (!state.questionSet) {
                console.error('optionAdded called without questionSet')
                return
            }
            const index = action.payload
            state.questionSet.questions[index].options.push(createEmptyEditor())
        },
        optionSelected: (
            state,
            action: PayloadAction<{
                questionIndex: number
                optionIndex: number
            }>
        ) => {
            if (!state.questionSet) {
                console.error('optionSelected called without questionSet')
                return
            }
            const { questionIndex, optionIndex } = action.payload
            state.questionSet.questions[questionIndex].answer = optionIndex
        },
        questionExplanationAdded: (state, action: PayloadAction<number>) => {
            if (!state.questionSet) {
                console.error(
                    'questionExplanationAdded called without questionSet'
                )
                return
            }
            const index = action.payload
            state.questionSet.questions[index].explanation = createEmptyEditor()
        },
        questionExplanationRemoved: (state, action: PayloadAction<number>) => {
            if (!state.questionSet) {
                console.error(
                    'questionSetExplanationRemoved called without questionSet'
                )
                return
            }
            const index = action.payload
            delete state.questionSet.questions[index].explanation
        },
        audioAdded: (state, action: PayloadAction<IAudio>) => {
            if (!state.questionSet) {
                console.error('audioAdded called without questionSet')
                return
            }
            state.questionSet.audio = action.payload
        },
        audioRemoved: (state) => {
            delete state.questionSet?.audio
        },
        questionSetBodyChanged: (
            state,
            action: PayloadAction<RichTextNode[]>
        ) => {
            if (!state.questionSet) {
                console.error(
                    'questionSetBodyChanged called without questionSet'
                )
                return
            }
            state.questionSet.body = action.payload
        },
        audioTranscriptionChanged: (state, action: PayloadAction<string>) => {
            if (!state.questionSet) {
                console.error(
                    'audioTranscriptionChanged called without questionSet'
                )
                return
            }
            if (!state.questionSet.audio) {
                console.error('audioTranscriptionChanged: audio is undefined')
                return
            }
            state.questionSet.audio.transcription = action.payload
        },
        questionBodyChanged: (
            state,
            action: PayloadAction<{
                value: RichTextNode[]
                questionIndex: number
            }>
        ) => {
            if (!state.questionSet) {
                console.error('questionBodyChanged called without questionSet')
                return
            }
            const { value, questionIndex } = action.payload

            const question = state.questionSet.questions[questionIndex]
            if (!question) {
                console.error('questionBodyChanged: question is undefined')
            }
            question.body = value
        },
        optionChanged: (
            state,
            action: PayloadAction<{
                value: RichTextNode[]
                questionIndex: number
                optionIndex: number
            }>
        ) => {
            if (!state.questionSet) {
                console.error('optionChanged called without questionSet')
                return
            }
            const { value, questionIndex, optionIndex } = action.payload

            const question = state.questionSet.questions[questionIndex]
            if (!question) {
                console.error('optionChanged: question is undefined')
                return
            }

            const option = question.options[optionIndex]
            if (option === undefined) {
                console.error('optionChanged: option is undefined')
                return
            }

            question.options[optionIndex] = value
        },
        questionExplanationChanged: (
            state,
            action: PayloadAction<{
                questionIndex: number
                value: RichTextNode[]
            }>
        ) => {
            if (!state.questionSet) {
                console.error('questionExplanationChanged:  no questionSet')
                return
            }
            const { value, questionIndex } = action.payload

            const question = state.questionSet.questions[questionIndex]
            if (!question) {
                console.error(
                    'questionExplanationChanged: question is undefined'
                )
                return
            }

            question.explanation = value
        },
        questionSetExplanationChanged: (
            state,
            action: PayloadAction<RichTextNode[]>
        ) => {
            if (!state.questionSet) {
                console.error('questionExplanationChanged:  no questionSet')
                return
            }
            state.questionSet.explanation = action.payload
        },
        errorDiscovered: (state, action: PayloadAction<string>) => {
            if (state.validationError) {
                state.validationError.push(action.payload)
            } else {
                state.validationError = [action.payload]
            }
        },
        errorReset: (state) => {
            state.validationError = null
        },
        questionSetSubmitted: (state) => {
            state.chapterId = null
            state.questionSet = null
            state.validationError = null
        },
        questionSetReceived: (state, payload: PayloadAction<IQuestionSet>) => {
            state.questionSet = payload.payload
        },
        finishEditing: (state) => {
            state.questionSet = null
        },
    },
})

export const {
    chapterUsed,
    questionSetBodyAdded,
    questionSetCreated,
    questionSetBodyRemoved,
    questionAdded,
    questionRemove,
    questionSetExplanationAdded,
    questionSetExplanationRemoved,
    questionBodyAdded,
    questionBodyRemoved,
    optionRemoved,
    optionAdded,
    optionSelected,
    questionExplanationAdded,
    questionExplanationRemoved,
    audioAdded,
    audioRemoved,
    questionSetBodyChanged,
    audioTranscriptionChanged,
    questionBodyChanged,
    optionChanged,
    questionExplanationChanged,
    questionSetExplanationChanged,
    errorDiscovered,
    errorReset,
    questionSetSubmitted,
    questionSetReceived,
    finishEditing,
} = questionSetEditorSlice.actions

export default questionSetEditorSlice.reducer

/* selectors */
export const selectHasQuestionSetBody = (state: RootState) => {
    const questionSet = state.questionSetEditor.questionSet
    return !!questionSet?.body
}

export const selectQuestionsCount = (state: RootState) => {
    if (state.questionSetEditor.questionSet) {
        return state.questionSetEditor.questionSet.questions.length
    } else {
        return 0
    }
}

export const selectOptionsCount =
    (questionIndex: number) => (state: RootState) => {
        if (state.questionSetEditor.questionSet) {
            return state.questionSetEditor.questionSet.questions[questionIndex]
                .options.length
        } else {
            return 0
        }
    }

export const selectOptions = (questionIndex: number) => (state: RootState) => {
    if (state.questionSetEditor.questionSet) {
        return state.questionSetEditor.questionSet.questions[questionIndex]
            .options
    }
}

export const selectIsSelected =
    (questionIndex: number, optionIndex: number) => (state: RootState) => {
        return (
            state.questionSetEditor.questionSet?.questions[questionIndex]
                .answer === optionIndex
        )
    }

export const selectHasAudio = (state: RootState) => {
    return state.questionSetEditor.questionSet?.audio !== undefined
}

export const selectAudioTranscription = (state: RootState) => {
    const audio = state.questionSetEditor.questionSet?.audio

    return audio?.transcription ?? ''
}

export const selectHasQuestionBody =
    (questionIndex: number) => (state: RootState) => {
        const questionSet = state.questionSetEditor.questionSet
        return !!questionSet?.questions[questionIndex]?.body
    }

export const selectOptionValue =
    (questionIndex: number, optionIndex: number) => (state: RootState) => {
        const questionSet = state.questionSetEditor.questionSet

        const question = questionSet?.questions[questionIndex]

        return question?.options[optionIndex]
    }

export const selectHasQuestionExplanation =
    (questionIndex: number) => (state: RootState) => {
        const questionSet = state.questionSetEditor.questionSet
        return !!questionSet?.questions[questionIndex]?.explanation
    }

export const selectHasQuestionSetExplanation = (state: RootState) => {
    const questionSet = state.questionSetEditor.questionSet
    return !!questionSet?.explanation
}

export const selectAddQuestionSetPayload = (state: RootState) => {
    const questionSet = state.questionSetEditor.questionSet
    if (!questionSet) {
        return
    }
    const chapterId = state.questionSetEditor.chapterId
    if (!chapterId) {
        return
    }
    return {
        questionSet,
        chapterId,
    }
}

/* tech debt */
export const selectUpdateQuestionSetPayload = (
    state: RootState
): { questionSet: IQuestionSet } | null => {
    const questionSet = state.questionSetEditor.questionSet

    if (questionSet !== null && questionSet.id === undefined) {
        return null
    }
    return { questionSet } as { questionSet: IQuestionSet }
}
