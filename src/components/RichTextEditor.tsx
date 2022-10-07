import React from 'react'

type Props = {
    value: string
    onChange: (value: string) => void
}

export default function RichTextEditor({ value, onChange }: Props) {
    return (
        <input
            value={value}
            className="w-full rounded bg-white p-4 shadow-md"
            placeholder="富文本编辑器 -- 待开发"
            onChange={(e) => onChange(e.target.value)}
        />
    )
}
