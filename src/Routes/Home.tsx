import PageLayout from '../components/layout/PageLayout'
import BookList from '../features/books/BookList'
import CategoryNav from '../features/books/Category'
import SearchBox from '../features/books/SearchBox'
import useAuthGuard from '../features/user/useAuthGuard'

export default function Home() {
    useAuthGuard()

    return (
        <PageLayout>
            <SearchBox />
            <CategoryNav />
            <BookList />
        </PageLayout>
    )
}
