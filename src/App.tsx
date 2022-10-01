import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { getLocalUserInfo } from './features/user/userThunks'
import BookEditor from './Routes/BookEditor'
import Error from './Routes/Error'
import Modal from 'react-modal'

import Home from './Routes/Home'
import Login from './Routes/Login'
import Member from './Routes/Member'
import MemberResult from './Routes/MemberResult'
import QuestionSetEditor from './Routes/QuestionSetEditor'
import { useAppDispatch } from './store/hooks'

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
        path: '/questionSetEditor/:questionSetId',
        element: <QuestionSetEditor />,
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
