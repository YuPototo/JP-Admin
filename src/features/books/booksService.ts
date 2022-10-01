import { splitApi } from '../../store/query/splitApi'
import type { Category, IBook } from './booksTypes'

export const booksApi = splitApi.injectEndpoints({
    endpoints: (build) => ({
        getCategoriyes: build.query<Category[], void>({
            query: () => 'categories',
            transformResponse: (res: { categories: Category[] }) =>
                res.categories,
        }),
        getBooks: build.query<IBook[], void>({
            query: () => 'books',
            transformResponse: (res: { books: IBook[] }) => res.books,
            providesTags: ['Book'],
        }),
        updateBook: build.mutation<
            IBook,
            { bookId: string; title?: string; desc?: string }
        >({
            query: ({ bookId, title, desc }) => ({
                url: `books/${bookId}`,
                method: 'PATCH',
                body: { title, desc },
            }),
            invalidatesTags: ['Book'],
        }),
    }),
})

export const {
    useGetCategoriyesQuery,
    useGetBooksQuery,
    useUpdateBookMutation,
} = booksApi
