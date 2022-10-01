import React from 'react'
import NavBar from '../NavBar'

export default function PageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-gray-200">
            <NavBar />
            <div className="mx-auto max-w-4xl px-4 pt-5">{children}</div>
        </div>
    )
}
