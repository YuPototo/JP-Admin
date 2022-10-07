import React from 'react'

type Props = {
    text?: string
}

export default function Transcription({ text }: Props) {
    if (!text) {
        return <></>
    }
    return (
        <div className="flex flex-col gap-3">
            <div className="font-bold text-green-700">听力原文</div>
            <div>{text}</div>
        </div>
    )
}
