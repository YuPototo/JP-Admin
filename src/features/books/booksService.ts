import { splitApi } from '../../store/query/splitApi'
import type { Category, IBook } from './booksTypes'

export const booksApi = splitApi.injectEndpoints({
    endpoints: (build) => ({
        getCategoriyes: build.query<Category[], void>({
            query: () => 'categories',
            transformResponse: (res: { categories: Category[] }) =>
                res.categories,
            keepUnusedDataFor: 60 * 30,
        }),
        getBooks: build.query<IBook[], void>({
            query: () => 'books',
            transformResponse: (res: { books: IBook[] }) => res.books,
            providesTags: ['Book'],
            keepUnusedDataFor: 60 * 30,
        }),
        updateBook: build.mutation<
            IBook,
            { bookId: string; title?: string; desc?: string; hidden?: boolean }
        >({
            query: ({ bookId, title, desc, hidden }) => ({
                url: `books/${bookId}`,
                method: 'PATCH',
                body: { title, desc, hidden },
            }),
            invalidatesTags: ['Book'],
        }),
        addBook: build.mutation<IBook, { title: string; desc?: string }>({
            query: (arg) => ({
                url: `books`,
                method: 'POST',
                body: arg,
            }),
            invalidatesTags: ['Book'],
            transformResponse: (res: { book: IBook }) => res.book,
        }),
        updateBookCover: build.mutation<
            void,
            { bookId: string; formData: FormData }
        >({
            query: ({ bookId, formData }) => ({
                url: `books/${bookId}/bookCover`,
                method: 'PATCH',
                body: formData,
            }),
            invalidatesTags: ['Book'],
        }),
    }),
})

export const {
    useGetCategoriyesQuery,
    useGetBooksQuery,
    useUpdateBookMutation,
    useAddBookMutation,
    useUpdateBookCoverMutation,
} = booksApi
