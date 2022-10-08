import clsx from 'clsx'
import React from 'react'

type Props = {
    active?: boolean
    onMouseDown: (event: React.MouseEvent) => void
    children: React.ReactNode
}

export default function ToolbarButton({
    active,
    onMouseDown,
    children,
}: Props) {
    return (
        <span
            className={clsx(
                'flex h-6 w-6 items-center justify-center rounded hover:cursor-pointer',
                active ? 'bg-green-200' : 'bg-gray-200'
            )}
            onMouseDown={onMouseDown}
        >
            {children}
        </span>
    )
}
