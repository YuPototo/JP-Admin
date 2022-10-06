import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAudio, INewQuestion, IQuestionSetInEditor } from './questionSetTypes'
import type { RootState } from '../../store/store'
import _ from 'lodash'

export interface QuestionSetEditorState {
    editType: null | 'new' | 'edit'
    questionSet: null | IQuestionSetInEditor
}

const initialState: QuestionSetEditorState = {
    editType: null,
    questionSet: null,
}

const emptyQuestion: INewQuestion = {
    body: '',
    options: ['', ''],
}

export const questionSetEditorSlice = createSlice({
    name: 'questionSetEditor',
    initialState,
    reducers: {
        questionSetCreated: (state) => {
            state.editType = 'new'
            state.questionSet = {
                questions: [_.cloneDeep(emptyQuestion)],
            }
        },
        questionSetBodyAdded: (state) => {
            if (!state.questionSet) {
                console.error('questionSetBodyAdded called without questionSet')
                return
            }
            state.questionSet.body = ''
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
            state.questionSet.explanation = ''
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
            state.questionSet.questions[index].body = ''
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
            state.questionSet.questions[index].options.push('')
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
            state.questionSet.questions[index].explanation = ''
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
    },
})

export const {
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
} = questionSetEditorSlice.actions

export default questionSetEditorSlice.reducer

/* selectors */
export const selectQuestionSetBody = (state: RootState) => {
    return state.questionSetEditor.questionSet?.body !== undefined
}

export const selectQuestionsCount = (state: RootState) => {
    if (state.questionSetEditor.questionSet) {
        return state.questionSetEditor.questionSet.questions.length
    } else {
        return 0
    }
}

export const selectHasQuestionSetExplanation = (state: RootState) => {
    return state.questionSetEditor.questionSet?.explanation !== undefined
}

export const selectHasQuestionSetBody =
    (index: number) => (state: RootState) => {
        return (
            state.questionSetEditor.questionSet?.questions[index].body !==
            undefined
        )
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

export const selectAnswer =
    (questionIndex: number, optionIndex: number) => (state: RootState) => {
        return (
            state.questionSetEditor.questionSet?.questions[questionIndex]
                .answer === optionIndex
        )
    }

export const selectHasQuestionExaplantion =
    (questionIndex: number) => (state: RootState) => {
        return (
            state.questionSetEditor.questionSet?.questions[questionIndex]
                .explanation !== undefined
        )
    }

export const selectHasAudio = (state: RootState) => {
    return state.questionSetEditor.questionSet?.audio !== undefined
}
