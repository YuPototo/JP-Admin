import { useAppSelector } from '../../../store/hooks'
import { useGetBooksQuery, useGetCategoriyesQuery } from '../booksService'
import { selectBookById, selectCategoryValueByKey } from '../booksSlice'
import { BookCategory, IBook } from '../booksTypes'
import BookCoverUpdator from './BookCoverUpdator'
import BookUpdator from './BookUpdator'
import ToggleHidden from './ToggleHidden'

type Props = {
    bookId: string
}

export default function BookInfo({ bookId }: Props) {
    const book = useAppSelector(selectBookById(bookId))
    useGetBooksQuery()
    useGetCategoriyesQuery()

    return (
        <div>
            {book ? (
                <BookMeta book={book} />
            ) : (
                <div>找不到 id 为 {bookId} 的练习册</div>
            )}
        </div>
    )
}

function BookMeta({ book }: { book: IBook }) {
    return (
        <div className="flex gap-6 rounded bg-white p-4">
            <div className="flex h-full flex-col rounded">
                <img className="h-44 rounded" alt="封面" src={book.cover} />
                <div className="-translate-y-1/2 self-center">
                    <BookCoverUpdator bookId={book.id} />
                </div>
            </div>
            <div className="">
                <h1 className="text-lg">{book.title}</h1>
                <div className="text-gray-500">{book.desc}</div>
                <div>
                    {book.category ? (
                        <CategoryBreadCrumb category={book.category} />
                    ) : (
                        <span className="text-sm text-gray-700">
                            本练习册还没有设置分类
                        </span>
                    )}
                </div>
                {book.hidden && <div className="my-2 text-red-500">隐藏中</div>}
            </div>
            <div className="ml-auto  self-center">
                <BookUpdator book={book} />

                <div className="mt-4">
                    <ToggleHidden book={book} />
                </div>
            </div>
        </div>
    )
}

function CategoryBreadCrumb({ category }: { category: BookCategory }) {
    const value = useAppSelector(selectCategoryValueByKey(category.key))
    return (
        <span>
            {value}
            {category.child && (
                <span>
                    <span className="mx-3 text-gray-500">{' > '}</span>
                    <CategoryBreadCrumb category={category.child} />
                </span>
            )}
        </span>
    )
}
