import { Formik } from 'formik'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import { useLoginMutation } from './userService'

export default function LoginForm() {
    const navigate = useNavigate()
    const [login] = useLoginMutation()
    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    await login(values)
                    setSubmitting(false)
                    toast.success('登录成功')
                    setTimeout(() => navigate('/'), 1000)
                } catch (err) {
                    // 在 middleware 处理了
                }
            }}
        >
            {({ values, handleChange, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="inline-block w-12" htmlFor="username">
                            用户名
                        </label>
                        <input
                            className="m-4 w-60 rounded p-2"
                            type="username"
                            name="username"
                            id="username"
                            onChange={handleChange}
                            value={values.username}
                        />
                    </div>
                    <div>
                        <label className="inline-block w-12" htmlFor="password">
                            密码
                        </label>
                        <input
                            className="m-4 w-60 rounded p-2"
                            type="password"
                            name="password"
                            id="password"
                            onChange={handleChange}
                            value={values.password}
                        />
                    </div>

                    <div className="mt-6">
                        <Button type="submit" disabled={isSubmitting}>
                            登录
                        </Button>
                    </div>
                </form>
            )}
        </Formik>
    )
}
