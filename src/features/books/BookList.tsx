import React from 'react'
import { useAppSelector } from '../../store/hooks'
import BookCard from './BookCard'
import { useGetBooksQuery } from './booksService'
import { selectBooksByCategory } from './booksSlice'

export default function BookList() {
    useGetBooksQuery()
    const books = useAppSelector(selectBooksByCategory)

    return (
        <div className="flex flex-wrap gap-6">
            {books.length > 0 ? (
                books.map((book, index) => <BookCard key={index} book={book} />)
            ) : (
                <div>该筛选条件内没有练习册</div>
            )}
        </div>
    )
}
