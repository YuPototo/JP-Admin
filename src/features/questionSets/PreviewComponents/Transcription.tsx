import React from 'react'

type Props = {
    text?: string
}

export default function Transcription({ text }: Props) {
    return (
        <div className="flex flex-col gap-3">
            <div className="font-bold text-green-700">听力原文</div>
            <div>{text || '无听力原文'}</div>
        </div>
    )
}
