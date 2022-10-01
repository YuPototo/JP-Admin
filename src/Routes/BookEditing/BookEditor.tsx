import { useParams } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'
import BookInfo from '../../features/books/components/BookInfo'

export default function BookEditor() {
    let { bookId } = useParams() as { bookId: string }

    return (
        <PageLayout>
            <BookInfo bookId={bookId} />
        </PageLayout>
    )
}
