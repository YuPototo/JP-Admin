import { Descendant } from 'slate'
import { MakeOptional } from '../../utils/typeUtils/makeOptional'

// Rich Text Node
// 这是一个很强的假设：rich text 的 node 和 descendant 会一样
export type RichTextNode = Descendant

// Question Set Interface
export interface IQuestion {
    body?: RichTextNode[]
    explanation?: RichTextNode[]
    options: RichTextNode[][]
    answer: number
}

export interface IAudio {
    id: string
    key: string
    transcription?: string
}

export interface IQuestionSet {
    id: string
    body?: RichTextNode[] // 大题题干
    questions: IQuestion[]
    explanation?: RichTextNode[] // 大题解析
    audio?: IAudio
}

// Working Questino Set Interface
export type WorkingOption = {
    uuid: string
    data: RichTextNode[]
}

export type WorkingQuestion = {
    uuid: string
    body?: RichTextNode[]
    explanation?: RichTextNode[]
    options: WorkingOption[]
    answer?: number
}

export type WorkingQuestionSet = {
    id?: string
    body?: RichTextNode[] // 大题题干
    questions: WorkingQuestion[]
    explanation?: RichTextNode[] // 大题解析
    audio?: IAudio
}

export type MaybeQuestion = MakeOptional<IQuestion, 'answer'>

export interface MaybeQuestionSet {
    id?: string
    body?: RichTextNode[] // 大题题干
    questions: MaybeQuestion[]
    explanation?: RichTextNode[] // 大题解析
    audio?: IAudio
}

export type NewQuestionSet = Omit<IQuestionSet, 'id'>

/* type predicate */
export function isIQuestion(
    maybeQuestion: MaybeQuestion
): maybeQuestion is IQuestion {
    return maybeQuestion.answer !== undefined
}

export function isNewQuestionSet(
    maybeQuestionSet: MaybeQuestionSet
): maybeQuestionSet is NewQuestionSet {
    if (!maybeQuestionSet.questions.every(isIQuestion)) {
        return false
    }
    return true
}

export function isIQuestionSet(
    maybeQuestionSet: MaybeQuestionSet
): maybeQuestionSet is IQuestionSet {
    if (!maybeQuestionSet.questions.every(isIQuestion)) {
        return false
    }

    if (!('id' in maybeQuestionSet)) {
        return false
    }

    return true
}
