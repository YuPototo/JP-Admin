export type IChapter = {
    id: string
    title: string
    desc?: string
}

export type ISection = {
    id: string
    title: string
    chapters: IChapter[]
}
