import clsx from 'clsx'
import { ReactElement } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { selectIsLogin, selectRoleType } from '../features/user/userSlice'
import { logout } from '../features/user/userThunks'
import { Role } from '../features/user/userTypes'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import Button from './ui/Button'

export default function NavBar(): ReactElement {
    const isLogin = useAppSelector(selectIsLogin)

    const role = useAppSelector((state) => state.user.role)

    return (
        <nav className="flex h-12 items-center gap-5 bg-white px-5">
            <Brand />

            <NavLink
                className={({ isActive }) =>
                    clsx('hidden p-2 hover:text-green-800 md:ml-20 md:inline', {
                        'bg-green-100': isActive,
                    })
                }
                end
                to={'/'}
            >
                首页
            </NavLink>

            {role === Role.Admin && (
                <NavLink
                    className={({ isActive }) =>
                        clsx('p-2 hover:text-green-800', {
                            'bg-green-100': isActive,
                        })
                    }
                    to={'/member'}
                >
                    开会员
                </NavLink>
            )}

            {isLogin || (
                <NavLink
                    className={({ isActive }) =>
                        clsx('p-2 hover:text-green-800', {
                            'bg-green-100': isActive,
                        })
                    }
                    to={'/login'}
                >
                    <Button>登录</Button>
                </NavLink>
            )}

            {isLogin && (
                <div className="ml-auto mr-10">
                    <AccountButton />
                </div>
            )}
        </nav>
    )
}

function Brand(): ReactElement {
    const iconImage = '/brand-icon.png' // 因为设置了 homepage 为 /app/

    return (
        <Link to={'/'} className="flex items-center ">
            <div className="py-2">
                <img className="h-8 md:h-10" src={iconImage} alt="brand" />
            </div>
            <span className="ml-2 hidden text-gray-600 md:inline">
                轻松考后台
            </span>
        </Link>
    )
}

function AccountButton() {
    const dispatch = useAppDispatch()

    const handleLogout = () => {
        dispatch(logout())
    }
    const username = useAppSelector((state) => state.user.username)
    const role = useAppSelector(selectRoleType)
    return (
        <div className="flex items-center gap-4">
            <div className="text-gray-600">{username}</div>
            <span className="text-gray-600">{role}</span>
            <Button outline onClick={handleLogout}>
                登出
            </Button>
        </div>
    )
}
