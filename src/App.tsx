import { Toaster } from 'react-hot-toast'
import BookList from './features/books/BookList'
import CategoryNav from './features/books/Category'

function App() {
    return (
        <div>
            <Toaster />

            <h1 className="text-3xl font-bold underline">This is admin page</h1>
            <CategoryNav />
            <BookList />
        </div>
    )
}

export default App
