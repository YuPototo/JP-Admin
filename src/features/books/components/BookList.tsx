import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../store/hooks'
import BookCard from './BookCard'
import { useGetBooksQuery } from '../booksService'
import { selectBooksByCategory } from '../booksSlice'

export default function BookList() {
    useGetBooksQuery()
    const books = useAppSelector(selectBooksByCategory)

    const searcTerm = useAppSelector((state) => state.books.searchTerm)

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
