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
    key: string
    transcription?: string
}

export interface IQuestionSet {
    id: string
    body?: string // 大题题干
    questions: IQuestion[]
    explanation?: string // 大题解析
    audio?: IAudio
}

type IQuestionInEditor = INewQuestion | IQuestion

export interface IQuestionSetInEditor {
    id?: string
    body?: string // 大题题干
    questions: IQuestionInEditor[]
    explanation?: string // 大题解析
    audio?: IAudio
}
