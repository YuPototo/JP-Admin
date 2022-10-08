import React from 'react'
import Transcription from './Transcription'

type Props = {
    url?: string
    text?: string
}

export default function AudioPart({ url, text }: Props) {
    if (!url) {
        return <></>
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="font-bold text-green-700">听力</div>
            <audio controls src={url}></audio>
            <Transcription text={text} />
        </div>
    )
}
