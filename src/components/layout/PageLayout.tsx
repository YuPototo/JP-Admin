import clsx from 'clsx'
import React from 'react'
import NavBar from '../NavBar'

export default function PageLayout({
    children,
    backgroundColor = 'bg-gray-900',
}: {
    children: React.ReactNode
    backgroundColor?: string
}) {
    return (
        <div className={clsx('min-h-screen ', backgroundColor)}>
            <NavBar />
            <div className="mx-auto max-w-6xl px-4 pt-5">{children}</div>
        </div>
    )
}
