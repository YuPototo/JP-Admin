import clsx from 'clsx'
import React from 'react'

/**
 * 通用的 toolbar button
 */

type Props = {
    disabled?: boolean
    active?: boolean
    onMouseDown: (event: React.MouseEvent) => void
    children: React.ReactNode
}

export default function ToolbarButton({
    active,
    onMouseDown,
    children,
    disabled = false,
}: Props) {
    return (
        <span
            className={clsx(
                'flex h-6 w-6 items-center justify-center rounded ',
                active ? 'bg-green-200' : 'bg-gray-200',
                disabled ? 'text-gray-400' : 'hover:cursor-pointer'
            )}
            onMouseDown={onMouseDown}
        >
            {children}
        </span>
    )
}
