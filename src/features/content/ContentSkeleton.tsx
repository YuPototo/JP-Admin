import React from 'react'

export default function ContentSkeleton() {
    return (
        <div className="rounded bg-white p-3">
            <h2 className="mb-4 font-bold text-green-700">目录</h2>
            <div className="skeleton mb-3 h-8 w-full"></div>
            <div className="skeleton mb-3 h-8 w-full"></div>
            <div className="skeleton h-8 w-full"></div>
        </div>
    )
}
