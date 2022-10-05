import PageLayout from '../components/layout/PageLayout'
import BookAdder from '../features/books/components/BookAdder'
import BookList from '../features/books/components/BookList'
import CategoryNav from '../features/books/components/Category'
import SearchBox from '../features/books/components/SearchBox'
import useAuthGuard from '../features/user/useAuthGuard'

export default function Home() {
    useAuthGuard()

    return (
        <PageLayout>
            <div className="flex gap-8">
                <SearchBox />
                <BookAdder />
            </div>
            <CategoryNav />
            <BookList />
        </PageLayout>
    )
}
