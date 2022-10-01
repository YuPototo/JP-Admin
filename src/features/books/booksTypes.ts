/* cateogry */
export type CategoryKey = string

export interface Category {
    key: CategoryKey
    displayValue: string
    children?: Category[]
}

/* books */
export interface BookCategory {
    key: CategoryKey
    child?: BookCategory
}

export interface IBook {
    id: string
    title: string
    category: BookCategory
    cover: string
    desc: string
    hidden: boolean
}
