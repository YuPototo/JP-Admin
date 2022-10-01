import React from 'react'
import PageLayout from '../components/layout/PageLayout'
import LoginForm from '../features/user/LoginForm'

export default function Login() {
    return (
        <PageLayout>
            <h1 className="mb-6 font-bold">登录账号</h1>

            <LoginForm />
        </PageLayout>
    )
}
