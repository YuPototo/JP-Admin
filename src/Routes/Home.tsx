import PageLayout from '../components/layout/PageLayout'
import BookList from '../features/books/BookList'
import CategoryNav from '../features/books/Category'

export default function Home() {
    return (
        <PageLayout>
            <CategoryNav />
            <BookList />
        </PageLayout>
    )
}
