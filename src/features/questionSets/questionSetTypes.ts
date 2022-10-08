import { Descendant } from 'slate'

// Rich Text Node
export type RichTextNode = Descendant

// Question Set Interface
export interface IQuestion {
    body?: string
    explanation?: string
    options: string[]
    answer: number
}

export interface INewQuestion {
    body?: string
    explanation?: string
    options: string[]
    answer?: number
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
    explanation?: string // 大题解析
    audio?: IAudio
    chapters: string[]
}

export type IQuestionInEditor = INewQuestion | IQuestion

export interface IQuestionSetInEditor {
    id?: string
    body?: RichTextNode[] // 大题题干
    questions: IQuestionInEditor[]
    explanation?: string // 大题解析
    audio?: IAudio
}

export interface AddQuestionSetPayload {
    body?: RichTextNode[] // 大题题干
    questions: IQuestionInEditor[]
    explanation?: string // 大题解析
    audio?: IAudio
}

export type UpdateQuestionSetPayload = Omit<IQuestionSet, 'chapters'>

// 之前对 rich text node 的定义是这样的：
// export interface IElement {
//     type: string
//     children: INode[]
// }

// export interface ITip extends IElement {
//     type: 'tip'
//     tip: string
// }

// export interface IImage extends IElement {
//     type: 'image'
//     src: string
//     alt: string
//     children: [{ text: '' }] // 似无必要，但是为了统一，还是加上
// }

// export interface IText {
//     text: string
// }

// export type INode = IElement | IText
