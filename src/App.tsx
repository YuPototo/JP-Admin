import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { getLocalUserInfo } from './features/user/userThunks'
import BookEditor from './routes/BookEditor'
import Error from './routes/Error'
import Modal from 'react-modal'

import Home from './routes/Home'
import Login from './routes/Login'
import Member from './routes/Member'
import MemberResult from './routes/MemberResult'
import QuestionSetEditor from './routes/QuestionSetEditor'
import { useAppDispatch } from './store/hooks'
import AddQuestionSet from './routes/AddQuestionSet'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <Error />,
    },
    {
        path: '/login',
        element: <Login />,
        errorElement: <Error />,
    },
    {
        path: '/member',
        element: <Member />,
        errorElement: <Error />,
    },
    {
        path: '/memberResult',
        element: <MemberResult />,
        errorElement: <Error />,
    },
    {
        path: '/bookEditor/:bookId/sectionIndex/:sectionIndex/chapterIndex/:chapterIndex',
        element: <BookEditor />,
    },
    {
        path: '/questionSetEditor',
        element: <QuestionSetEditor />,
    },
    {
        path: '/addQuestionSet',
        element: <AddQuestionSet />,
    },
])

Modal.setAppElement('#root')

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getLocalUserInfo())
    }, [dispatch])

    return (
        <>
            <Toaster />

            <RouterProvider router={router} />
        </>
    )
}

export default App
