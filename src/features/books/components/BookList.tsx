import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../store/hooks'
import BookCard from './BookCard'
import { useGetBooksQuery } from '../booksService'
import { selectBooksByCategory } from '../booksSlice'
import BookSkeleton from './BookSkeleton'

export default function BookList() {
    const { isLoading } = useGetBooksQuery()
    const books = useAppSelector(selectBooksByCategory)

    const searcTerm = useAppSelector((state) => state.books.searchTerm)

    if (isLoading) {
        return <BookListSkeleton />
    }

    return (
        <div className="flex flex-wrap gap-6">
            {books.length > 0 ? (
                books
                    .filter((book) =>
                        book.title.toLowerCase().includes(searcTerm)
                    )
                    .map((book, index) => (
                        <Link
                            key={index}
                            to={`/bookEditor/${book.id}/sectionIndex/0/chapterIndex/0`}
                        >
                            <BookCard book={book} />
                        </Link>
                    ))
            ) : (
                <div>该筛选条件内没有练习册</div>
            )}
        </div>
    )
}

function BookListSkeleton() {
    return (
        <div className="flex flex-wrap gap-6">
            <BookSkeleton />
            <BookSkeleton />
            <BookSkeleton />
            <BookSkeleton />
            <BookSkeleton />
            <BookSkeleton />
        </div>
    )
}
