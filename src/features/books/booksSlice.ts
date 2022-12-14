import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'
import type { IBook, Category, CategoryKey } from './booksTypes'
import { booksApi } from './booksService'

export interface BookListState {
    categories: Category[]
    selectedCategoryKeys: CategoryKey[]
    books: IBook[]
    searchTerm: string
}

const initialState: BookListState = {
    categories: [],
    selectedCategoryKeys: [],
    books: [],
    searchTerm: '',
}

export const bookListSlice = createSlice({
    name: 'bookList',
    initialState,
    reducers: {
        categoryPicked: (
            state,
            action: PayloadAction<{ categoryLevel: number; key: string }>
        ) => {
            const { categoryLevel: index, key } = action.payload

            if (index > state.selectedCategoryKeys.length) {
                console.error(
                    `setCategoryKey: index ${index} is larger than selectedCategoryKeys.length ${state.selectedCategoryKeys.length}`
                )
                return
            }

            if (index === 0) {
                if (state.selectedCategoryKeys[0] === key) {
                    state.selectedCategoryKeys = [] // 反选
                } else {
                    state.selectedCategoryKeys = [key]
                }
            } else if (index === 1) {
                if (state.selectedCategoryKeys[1] === key) {
                    state.selectedCategoryKeys.splice(1, 1)
                } else {
                    state.selectedCategoryKeys = [
                        state.selectedCategoryKeys[0] as string, // Tech debt: remove as
                        key,
                    ]
                }
            } else if (index === 2) {
                if (state.selectedCategoryKeys[2] === key) {
                    state.selectedCategoryKeys.splice(2, 1)
                } else {
                    state.selectedCategoryKeys = [
                        state.selectedCategoryKeys[0] as string, // Tech debt: remove as
                        state.selectedCategoryKeys[1] as string,
                        key,
                    ]
                }
            }
        },
        cleanCategory: (state) => {
            state.selectedCategoryKeys = []
        },
        searchTermChanged: (state, { payload }: PayloadAction<string>) => {
            state.searchTerm = payload.toLocaleLowerCase()
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                booksApi.endpoints.getCategoriyes.matchFulfilled,
                (state, { payload }) => {
                    state.categories = payload
                }
            )
            .addMatcher(
                booksApi.endpoints.getBooks.matchFulfilled,
                (state, { payload }) => {
                    state.books = payload
                }
            )
    },
})

export const { categoryPicked, cleanCategory, searchTermChanged } =
    bookListSlice.actions

/* selectors */

/**
 * 给定 Category level 和 state，返回被选中的 category 的 chidlren
 * 假定只有前2层 category 会有 children
 */
export const selectChildrenByLevel =
    (categoryLevel: number) => (state: RootState) => {
        const categories = state.books.categories
        const selectedCategoryKeys = state.books.selectedCategoryKeys
        if (categoryLevel === 0) {
            const key = selectedCategoryKeys?.[0]
            return categories.find((c) => c.key === key)?.children
        } else if (categoryLevel === 1) {
            const key_0 = selectedCategoryKeys?.[0]
            const parentCategories = categories.find(
                (c) => c.key === key_0
            )?.children
            const key_1 = selectedCategoryKeys?.[1]
            return parentCategories?.find((c) => c.key === key_1)?.children
        } else {
            return
        }
    }

export const selectBooksByCategory = (state: RootState) => {
    const selectedCategoryKeys = state.books.selectedCategoryKeys
    const books = state.books.books

    const selectedCategoryLength = selectedCategoryKeys.length
    if (selectedCategoryLength === 0) {
        return books
    } else if (selectedCategoryLength === 1) {
        const key = selectedCategoryKeys[0]
        return books.filter((b) => b.category?.key === key)
    } else if (selectedCategoryLength === 2) {
        const key_0 = selectedCategoryKeys[0]
        const key_1 = selectedCategoryKeys[1]
        return books.filter(
            (b) => b.category?.key === key_0 && b?.category.child?.key === key_1
        )
    } else if (selectedCategoryLength === 3) {
        const key_0 = selectedCategoryKeys[0]
        const key_1 = selectedCategoryKeys[1]
        const key_2 = selectedCategoryKeys[2]
        return books.filter(
            (b) =>
                b.category?.key === key_0 &&
                b.category.child?.key === key_1 &&
                b.category.child?.child?.key === key_2
        )
    } else {
        console.error('不允许4层及以上 cateory')
        return books
    }
}

export const hasSelectedCatory = (state: RootState) => {
    return state.books.selectedCategoryKeys.length > 0
}

export const selectBookById = (bookId?: string) => (state: RootState) => {
    return state.books.books.find((book) => book.id === bookId)
}

export const selectFlattenCategories = (state: RootState) => {
    const categories = state.books.categories
    const flattenCategories: Category[] = []
    categories.forEach((c) => {
        flattenCategories.push(c)
        c.children?.forEach((c) => {
            flattenCategories.push(c)
            c.children?.forEach((c) => {
                flattenCategories.push(c)
            })
        })
    })
    return flattenCategories
}

export const selectCategoryValueByKey =
    (categoryKey: string) => (state: RootState) => {
        const categories = selectFlattenCategories(state)
        return categories.find((c) => c.key === categoryKey)?.displayValue
    }

export default bookListSlice.reducer
