import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import { selectIsLogin } from './userSlice'

export default function useAuthGuard() {
    const navigate = useNavigate()

    const hasFetcedLocalUser = useAppSelector(
        (state) => state.user.hasFetcedLocalUser
    )
    const isLogin = useAppSelector(selectIsLogin)

    useEffect(() => {
        if (!hasFetcedLocalUser) return

        let timer: NodeJS.Timeout | null = null
        if (!isLogin) {
            toast('请登录')
            timer = setTimeout(() => {
                navigate('/login')
            }, 1500)
        }

        return () => {
            if (timer) {
                clearTimeout(timer)
            }
        }
    }, [hasFetcedLocalUser, isLogin, navigate])
}

export function useAdminAuthGuard() {
    const navigate = useNavigate()

    const hasFetcedLocalUser = useAppSelector(
        (state) => state.user.hasFetcedLocalUser
    )
    const isLogin = useAppSelector(selectIsLogin)
    const role = useAppSelector((state) => state.user.role)

    useEffect(() => {
        if (!hasFetcedLocalUser) return
        if (!isLogin) return

        if (role !== 'admin') {
            toast.error('您没有权限访问该页面')
            navigate('/')
        }
    }, [hasFetcedLocalUser, isLogin, navigate, role])
}
